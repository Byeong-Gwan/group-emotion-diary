import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const EmotionModal = (props) => {
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const MAX_DAILY = 3;

  // 하루 횟수 유지
  useEffect(() => {
    const saved = localStorage.getItem("dailyCount");
    const today = localStorage.getItem("dailyCountDate");
    const now = new Date().toDateString();

    if (saved && today === now) {
      setCount(Number(saved));
    } else {
      localStorage.setItem("dailyCount", 0);
      localStorage.setItem("dailyCountDate", now);
      setCount(0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyCount", count);
  }, [count]);

  const analyzeEmotion = async () => {
    if (loading) return;
    if (count >= MAX_DAILY) return alert("오늘 최대 분석 횟수에 도달했습니다.");

    setLoading(true);
    setEmotionResult("");

    try {
      const { data } = await axios.post(
        "https://tobyyada.pythonanywhere.com/analyze",
        { text: props.diary.content }
      );
      setEmotionResult(data.result);
      setCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setEmotionResult("분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const isLastTry = count >= MAX_DAILY - 1;

  return (
    <BootstrapModal
      {...props}
      size="lg"
      centered
      contentClassName="bg-dark text-light"
    >
      <BootstrapModal.Header closeButton closeVariant="white">
        <BootstrapModal.Title>감정 분석</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <p>
          오늘 사용한 횟수: {count}/{MAX_DAILY}
        </p>

        {!emotionResult && !loading && (
          <Button
            variant="outline-light"
            onClick={analyzeEmotion}
            disabled={count >= MAX_DAILY}
          >
            감정 분석 요청
          </Button>
        )}

        {loading && <p>분석 중...</p>}

        {!loading && emotionResult && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              background: "#f0f0f0",
              color: "#000",
            }}
          >
            <strong>분석 결과:</strong>
            <p>{emotionResult}</p>
          </div>
        )}
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        {/* 분석 결과가 있을 때만 버튼 표시 */}
        {emotionResult && (
          <>
            {/* 마지막 횟수 전까지 “다시 요청” 가능 */}
            {!isLastTry && (
              <Button
                variant="warning"
                onClick={analyzeEmotion}
                disabled={loading}
              >
                다시 요청
              </Button>
            )}

            {/* 확인 → 부모 페이지에 결과 전달 */}
            <Button
              variant="success"
              onClick={() => props.onConfirm(emotionResult)}
            >
              확인
            </Button>
          </>
        )}

        <Button variant="outline-light" onClick={props.onHide}>
          닫기
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default EmotionModal;
