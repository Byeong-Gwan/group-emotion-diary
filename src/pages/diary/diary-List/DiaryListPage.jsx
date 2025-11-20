import { Link } from "react-router-dom";
import { Button, Card, Form, Nav } from "react-bootstrap";
import "./DiaryListPage.style.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../app/store/auth";
import useDiaryStore from "../../../app/store/diary";
import DatePicker from "react-datepicker";

export default function DiaryListPage() {
  console.log("ddddd", useDiaryStore?.getState().diaries);

  const { userInfo } = useUserStore();
  const [diaries, setDiaries] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [moodFilter, setMoodFilter] = useState("all");
  const { selectedDate, setSelectedDate } = useDiaryStore();

  const selectedMonth = new Date(selectedDate).getMonth() + 1;

  // ['#6cc08e''#8fc970' '#e9b80f''#ea7430''#e64b52']

  const moodColors = {
    "very-good": "#6cc08e",
    good: "#8fc970",
    "so-so": "#e9b80f",
    bad: "#ea7430",
    awful: "#e64b52",
  };

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
    } else {
      setDiaries([]);
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
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <Form.Select
              style={{ width: "100%" }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </Form.Select>
            <Form.Select
              style={{ width: "100%" }}
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
          </div>
          <Nav className="mb-3 mb-lg-0">
            <DatePicker
              dateFormat="yyyy년 MM월"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="form-control text-center"
            />
          </Nav>
        </div>

        {!userInfo ? (
          <Card className="diaryList-card">
            <Card.Body>
              <Card.Title>로그인을 해주세요~</Card.Title>
              <Button variant="outline-primary" disabled={true}>
                Detail
              </Button>
            </Card.Body>
          </Card>
        ) : diaries.length === 0 ? (
          <Card className="diaryList-card">
            <Card.Body>
              <Card.Title>데이터가 없습니다.</Card.Title>
              <Button variant="outline-primary" disabled={true}>
                Detail
              </Button>
            </Card.Body>
          </Card>
        ) : (
          sortedDiaries.map((d, idx) => (
            <Card
              key={d.id}
              className="diaryList-card"
              style={{ border: `3px solid ${moodColors[d.mood] || "#ccc"}` }}
            >
              <Card>
                <Card.Body as={Link} to={`/diary/${d.id}`}>
                  <Card.Text className="d-flex justify-content-end">
                    {new Date(d.createdAt).toLocaleDateString("ko-KR")}
                  </Card.Text>
                  <div className="px-1">
                    <h3>{idx}</h3>
                    <Card.Title>{d.title}</Card.Title>
                    <Card.Text>{d.content.slice(0, 80)}...</Card.Text>
                    <div className="d-flex justify-content-start gap-3">
                      <Card.Text
                        style={{
                          color: `${moodColors[d.mood] || "#ccc"}`,
                          fontWeight: "bolder",
                        }}
                      >
                        {d.mood}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
                <div
                  className="p-3 d-flex justify-content-end"
                  style={{ boxSizing: "border-box" }}
                >
                  <button className="mx-1">수정</button>
                  <button className="mx-1">삭제</button>
                </div>
              </Card>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
