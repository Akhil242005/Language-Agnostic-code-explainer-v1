# Language-Agnostic Code Explainer

AST-based code explanation engine supporting:

- Python (fully AST-driven)
- JavaScript (basic engine)
- C++ (basic engine)

## Architecture

Parser → IR → Semantic Reasoning

## Run Backend

```bash
cd backend
uvicorn app.main:app --reload