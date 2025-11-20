import { Link } from "react-router-dom";
import { Button, Card, Form, Nav } from "react-bootstrap";
import "./DiaryListPage.style.css";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../app/store/auth";
import useDiaryStore from "../../../app/store/diary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

export default function DiaryListPage() {
  console.log("ddddd", useDiaryStore?.getState().diaries);

  const { userInfo } = useUserStore();
  const [diaries, setDiaries] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [moodFilter, setMoodFilter] = useState("all");
  const { selectedDate, setSelectedDate } = useDiaryStore();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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

  // 감정 필터링 -> return filteredDiaries
  const filteredDiaries = diaries.filter((d) => {
    if (moodFilter === "all") return true;
    return d.mood === moodFilter;
  });

  //filteredDiaries -> 정렬 -> return sortedDiaries
  const sortedDiaries = [...filteredDiaries].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === "latest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  //필터링 -> 정렬 vs 정렬 -> 필터링 : 결과는 비슷할 수 있으나 데이터가 많을 수록 전자의 효율이 올라간다.
  //10만 개 전체를 정렬 (O(n log n) → 약 10만 × log(10만)) -> 결과에서 조건에 맞는 것만 필터링 (O(n))

  //10만 개 중 조건에 맞는 것만 필터링 (O(n)) -> - 필터링된 결과만 정렬 (O(m log m), 여기서 m은 필터링 후 남은 데이터 개수)

  //m = n 이라면 속도가 같지만 두 값이 같을 확률은 적다. m은 5개의 감정을 중 특정 감정을 필터링한 결과라서

  //현재 페이지의 시작점
  const offset = currentPage * itemsPerPage;
  const currentDiaries = sortedDiaries.slice(offset, offset + itemsPerPage);
  //전체 페이지 수
  const pageCount = Math.ceil(sortedDiaries.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">{selectedMonth}월 Diaries</h3>
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
              <Card.Title className="p-2">로그인을 해주세요~</Card.Title>
              <Button variant="outline-primary" disabled={true}>
                Detail
              </Button>
            </Card.Body>
          </Card>
        ) : diaries.length === 0 ? (
          <Card className="diaryList-card">
            <Card.Body>
              <Card.Title className="p-2">데이터가 없습니다.</Card.Title>
            </Card.Body>
          </Card>
        ) : (
          currentDiaries.map((d, idx) => (
            <Card key={d.id} className="diaryList-card">
              <Card.Body>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text className="diaryList-excerpt">{d.content.slice(0, 80)}...</Card.Text>
                <div className="d-flex justify-content-start gap-3">
                  <Card.Text style={{backgroundColor:`${moodColors[d.mood]}`, color:"white"}}>{d.mood}</Card.Text>
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
              <div
                className="p-3 d-flex justify-content-between"
                style={{ boxSizing: "border-box" }}
              >
                <div className="fs-4">{offset + idx + 1}</div>
                <div>
                  <button className="mx-1">수정</button>
                  <button className="mx-1">삭제</button>
                </div>
              </div>
            </Card>
          ))
        )}

        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
