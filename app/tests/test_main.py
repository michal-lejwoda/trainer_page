from fastapi.testclient import TestClient

from app.local import app

client = TestClient(app)

def test_read_main2():
    assert 1 == 1

def test_read_main():
    response = client.get("/api/reservation123")
    assert response.status_code == 200
    assert response.json() == {"message": "Reservation endpoint works"}


