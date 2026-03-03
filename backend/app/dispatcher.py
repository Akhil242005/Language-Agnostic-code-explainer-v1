from app.languages.python_engine import explain_python
from app.languages.javascript_engine import explain_javascript
from app.languages.cpp_engine import explain_cpp


def dispatch_explanation(code: str, language: str):
    language = language.lower()

    if language == "python":
        return explain_python(code)

    if language == "javascript":
        return explain_javascript(code)

    if language == "cpp":
        return explain_cpp(code)

    return ["Unsupported language selected."]