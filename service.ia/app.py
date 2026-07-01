import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai

load_dotenv()

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "http://localhost:4200"
        }
    }
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "La variable GEMINI_API_KEY est introuvable."
    )

client = genai.Client(api_key=api_key)


@app.post("/api/ai/summarize")
def summarize_note():
    try:
        data = request.get_json(silent=True) or {}

        title = str(data.get("title", "")).strip()
        content = str(data.get("content", "")).strip()

        if not content:
            return jsonify({
                "message": "Le contenu de la note est obligatoire."
            }), 400

        prompt = f"""
Tu es un assistant pour une application de gestion de notes.

Résume la note suivante en français :
- utilise entre 2 et 4 phrases ;
- conserve les informations importantes ;
- ne rajoute aucune information inexistante ;
- retourne uniquement le résumé.

Titre : {title}

Contenu :
{content}
"""

        interaction = client.interactions.create(
            model="gemini-3.5-flash",
            input=prompt
        )

        summary = interaction.output_text.strip()

        return jsonify({
            "summary": summary
        }), 200

    except Exception as error:
        app.logger.exception(error)

        return jsonify({
            "message": "Impossible de générer le résumé."
        }), 500


@app.get("/api/ai/health")
def health():
    return jsonify({
        "status": "AI service is running"
    }), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )