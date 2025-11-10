from config import create_app, Config
from eureka_client import register_with_eureka

app = create_app()

if __name__ == "__main__":
    register_with_eureka()
    app.run(host="0.0.0.0", port=Config.SERVICE_PORT, debug=True)
