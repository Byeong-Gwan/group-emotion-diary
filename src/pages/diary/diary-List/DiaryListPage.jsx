import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./DiaryListPage.style.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../app/store/auth";

export default function DiaryListPage() {
  const { userInfo } = useUserStore();

  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/emotionDiary")
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("데이터 가져오기 실패:", err));
  }, []);

  const filteredList = diaries.filter((item) => item.name === userInfo?.name);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Diaries</h3>
        <Button as={Link} to="/diary/new">
          New
        </Button>
      </div>
      <div className="d-grid gap-3">
        목록
        {filteredList.length > 0 ? (
          filteredList.map((d) => (
            <Card key={d.id} className="diaryList-card">
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text>{d.note.slice(0, 80)}...</Card.Text>
                <Button
                  as={Link}
                  to={`/diary/${d.id}`}
                  variant="outline-primary"
                >
                  Detail
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Card className="diaryList-card">
            <Card.Body>
              <Card.Title>일기가 없습니다.</Card.Title>
              <Card.Text>---------</Card.Text>
              <Button
                  variant="outline-primary"
                  disabled={true}
                >
                  Detail
                </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}
