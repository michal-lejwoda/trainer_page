from fastapi.testclient import TestClient

from app.local import app

client = TestClient(app)

def test_read_main2():
    assert 1 == 1

def test_read_main():
    print(app.openapi())
    response = client.get("/api/reservation123")
    print(f"Response JSON: {response.json()}")
    assert response.status_code == 200
    assert response.json() == {"message": "Reservation endpoint works"}


