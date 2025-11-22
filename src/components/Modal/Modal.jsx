import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useDiaryStore from "../../app/store/diary";

const EmotionModal = (props) => {
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const MAX_DAILY = 3;
  const clickLock = useRef(false);

  // 하루 횟수 유지 (일기별)
  useEffect(() => {
    if (!props.diary?.id) return;
    const keyCount = `dailyCount:${props.diary.id}`;
    const keyDate = `dailyCountDate:${props.diary.id}`;

    const saved = localStorage.getItem(keyCount);
    const today = localStorage.getItem(keyDate);
    const now = new Date().toDateString();

    if (saved && today === now) {
      const n = Number(saved);
      setCount(Number.isFinite(n) ? Math.min(Math.max(n, 0), MAX_DAILY) : 0);
    } else {
      localStorage.setItem(keyCount, 0);
      localStorage.setItem(keyDate, now);
      setCount(0);
    }
    // 일기 변경 시마다 다시 계산
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.diary?.id]);

  useEffect(() => {
    if (!props.diary?.id) return;
    const keyCount = `dailyCount:${props.diary.id}`;
    localStorage.setItem(keyCount, count);
  }, [count, props.diary?.id]);

  const analyzeEmotion = async () => {
    if (loading || clickLock.current) return;
    if (count >= MAX_DAILY) return alert("오늘 최대 분석 횟수에 도달했습니다.");

    clickLock.current = true;
    setLoading(true);
    setEmotionResult("");

    try {
      const { data } = await axios.post(
        "https://tobyyada.pythonanywhere.com/analyze",
        { text: props.diary.content }
      );

      setEmotionResult(data.result);
      setCount((prev) => Math.min(prev + 1, MAX_DAILY));

      useDiaryStore.getState().updateDiary(props.diary.id, {
        analysis: data.result,
        analyzedAt: new Date().toISOString(), // 분석한 날짜 저장(Optional)
      });
    } catch (err) {
      console.error(err);
      setEmotionResult("분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      clickLock.current = false;
    }
  };

  const isLastTry = count >= MAX_DAILY - 1;

  return (
    <BootstrapModal
      {...props}
      size="lg"
      centered
      contentClassName="emotion-modal"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>감정 분석</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <p className="emotion-modal-count text-muted small mb-3">
          오늘 사용한 횟수: {count}/{MAX_DAILY}
        </p>

        {!emotionResult && !loading && (
          <Button
            variant="outline-primary"
            onClick={analyzeEmotion}
            disabled={loading || count >= MAX_DAILY}
          >
            감정 분석 요청
          </Button>
        )}

        {loading && <p className="mb-0">분석 중...</p>}

        {!loading && emotionResult && (
          <div className="emotion-result-box mt-3">
            <strong className="emotion-result-title">분석 결과:</strong>
            <p className="emotion-result-text">{emotionResult}</p>
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
                variant="outline-primary"
                onClick={analyzeEmotion}
                disabled={loading || count >= MAX_DAILY}
              >
                다시 요청
              </Button>
            )}

            {/* 확인 → 부모 페이지에 결과 전달 */}
            <Button
              variant="primary"
              onClick={() => props.onConfirm(emotionResult)}
            >
              확인
            </Button>
          </>
        )}

        <Button variant="outline-secondary" onClick={props.onHide}>
          닫기
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default EmotionModal;
