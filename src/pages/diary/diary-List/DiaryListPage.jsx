import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import "./DiaryListPage.style.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../app/store/auth";
import useDiaryStore from "../../../app/store/diary";

// 로컬 스토리지에서 가져온다면?
export default function DiaryListPage() {
  console.log("ddddd", useDiaryStore?.getState().diaries);

  const { userInfo } = useUserStore();
  const [diaries, setDiaries] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [moodFilter, setMoodFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    if (selectedMonth === 10) {
      fetch("http://localhost:3000/emotionDiary")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((item) => item?.name === userInfo?.name);
          setDiaries(filtered);
        })
        .catch((err) => console.error("데이터 가져오기 실패", err));
    } else if (selectedMonth === 11) {
      const localDiaries = useDiaryStore.getState().diaries;
      setDiaries(localDiaries);
    }
  }, [selectedMonth, userInfo]);
  console.log(diaries);

  const filteredDiaries = diaries.filter((d) => {
    if (moodFilter === "all") return true;
    return d.mood === moodFilter;
  });

  const sortedDiaries = [...filteredDiaries].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === "latest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{selectedMonth}월 Diaries</h1>
        <Button as={Link} to="/diary/new">
          New
        </Button>
      </div>
      <div className="d-grid gap-3">
        <div className="d-flex justify-content-start gap-3">
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </Form.Select>
          <Form.Select
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
          >
            <option value="all">전부</option>
            <option value="very-good">매우 좋음</option>
            <option value="good">좋음</option>
            <option value="so-so">그저그럼</option>
            <option value="bad">나쁨</option>
            <option value="awful">매우나쁨</option>
          </Form.Select>
          <Form.Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            <option value={10}>10월 (JSON 서버)</option>
            <option value={11}>11월 (로컬스토리지)</option>
          </Form.Select>
        </div>
        {sortedDiaries.length > 0 ? (
          sortedDiaries.map((d) => (
            <Card key={d.id} className="diaryList-card">
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text>{d.content.slice(0, 80)}...</Card.Text>
                <div className="d-flex justify-content-start gap-3">
                  <Card.Text>{d.mood}</Card.Text>
                  <Card.Text>
                    {new Date(d.createdAt).toLocaleDateString("ko-KR")}
                  </Card.Text>
                </div>
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
              <Card.Title>로그인을 해주세요.</Card.Title>
              <Button variant="outline-primary" disabled={true}>
                Detail
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}
