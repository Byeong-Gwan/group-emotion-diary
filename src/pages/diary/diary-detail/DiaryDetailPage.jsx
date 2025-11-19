import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import useDiaryStore from "../../../app/store/diary.js";
import EmotionModal from "../../../components/Modal/Modal.jsx";
import { Button } from "react-bootstrap";

export default function DiaryDetailPage() {
  const { id } = useParams();
  const getDiary = useDiaryStore((s) => s.getDiary);
  const diary = getDiary(id);
  const navigate = useNavigate();

  const [modalShow, setModalShow] = React.useState(false);
  const [aiResult, setAiResult] = React.useState(""); // AI 결과 저장

  if (!diary) return <p>일기를 찾을 수 없습니다.</p>;

  const moodColors = {
    "very-good": "#f1fbf4",
    good: "#f5fbf0",
    "so-so": "#fff8dd",
    bad: "#fff0e8",
    awful: "#ffecef",
  };

  return (
    <article
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: 16,
        background: moodColors[diary.mood] || "transparent",
        borderRadius: 12,
      }}
    >
      <h3 className="mb-3">{diary.title}</h3>
      <p>
        <strong>기분:</strong> {diary.mood}
      </p>
      <p>
        <strong>작성일:</strong> {new Date(diary.createdAt).toLocaleString()}
      </p>
      <hr />
      <p style={{ whiteSpace: "pre-wrap" }}>{diary.content}</p>

      {/* AI 결과가 있는 경우 아래에 출력 */}
      {aiResult && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f7f7ff",
            borderRadius: 10,
          }}
        >
          <h5>📌 AI 감정 분석 결과</h5>
          <p style={{ whiteSpace: "pre-wrap" }}>{aiResult}</p>
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <Button variant="danger" size="lg" onClick={() => setModalShow(true)}>
          ▶ AI 감정 분석
        </Button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          목록으로 돌아가기
        </button>
      </div>

      <EmotionModal
        diary={diary}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirm={(result) => {
          setAiResult(result);
          setModalShow(false);
        }}
      />
    </article>
  );
}
