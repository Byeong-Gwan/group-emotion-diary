import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import useDiaryStore from "../../app/store/diary";

const EmotionModal = (props) => {
  const [emotionResult, setEmotionResult] = useState("");
  const [loading, setLoading] = useState(false);

  const diary = useDiaryStore((state) => state.getDiary(props.diary.id));
  const MAX_PER_DIARY = 3;

  const analyzeEmotion = async () => {
    if (loading) return;

    const currentCount = diary.analysisCount || 0;
    if (currentCount >= MAX_PER_DIARY) {
      return alert("이 일기는 더 이상 분석할 수 없습니다.");
    }

    setLoading(true);
    setEmotionResult("");

    try {
      const { data } = await axios.post(
        "https://tobyyada.pythonanywhere.com/analyze",
        { text: diary.content }
      );

      setEmotionResult(data.result);

      useDiaryStore.getState().updateDiary(diary.id, {
        analysis: data.result,
        analyzedAt: new Date().toISOString(),
        analysisCount: currentCount + 1,
      });
    } catch (err) {
      console.error(err);
      setEmotionResult("분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

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
          현재 일기 분석 횟수: {diary.analysisCount || 0}/{MAX_PER_DIARY}
        </p>

        {!emotionResult && !loading && (
          <Button
            variant="outline-primary"
            onClick={analyzeEmotion}
            disabled={(diary.analysisCount || 0) >= MAX_PER_DIARY}
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
        {emotionResult && (
          <>
            {(diary.analysisCount || 0) < MAX_PER_DIARY ? (
              <Button
                variant="outline-primary"
                onClick={analyzeEmotion}
                disabled={loading}
              >
                다시 요청
              </Button>
            ) : (
              <p>이 일기는 더 이상 분석할 수 없습니다.</p>
            )}

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
