from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "Python Code Explainer"
    version: str = "0.1.0"

settings = Settings()
