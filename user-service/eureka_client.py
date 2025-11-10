import py_eureka_client.eureka_client as eureka_client
from config import Config

def register_with_eureka():
    try:
        eureka_client.init(
            eureka_server=Config.EUREKA_SERVER,
            app_name=Config.SERVICE_NAME,
            instance_port=Config.SERVICE_PORT,
            instance_host=Config.HOST,
            health_check_url=f"http://{Config.HOST}:{Config.SERVICE_PORT}/health",
            home_page_url=f"http://{Config.HOST}:{Config.SERVICE_PORT}/",
            status_page_url=f"http://{Config.HOST}:{Config.SERVICE_PORT}/info",
            renewal_interval_in_secs=5,
            duration_in_secs=10,
            instance_id=f"{Config.SERVICE_NAME}-{Config.HOST}-{Config.SERVICE_PORT}"
        )
        print(f"✅ Registered '{Config.SERVICE_NAME}' with Eureka at {Config.EUREKA_SERVER}")
    except Exception as e:
        print(f"⚠️ Eureka registration failed: {e}")
