 import { useParams, Link } from 'react-router-dom'
 import { Button } from 'react-bootstrap'
 import './DiaryDetailPage.style.css'

 // 아주 단순한 목업 데이터 (실제 API 연결 전)
 const mockDiaries = {
   '1': { id: '1', title: 'First', content: 'First diary content', mood: 'neutral', createdAt: new Date().toISOString() },
   '2': { id: '2', title: 'Second', content: 'Second diary content', mood: 'happy', createdAt: new Date().toISOString() }
 }

 export default function DiaryDetailPage() {
   const { id } = useParams()
   const diary = id ? mockDiaries[id] : null

   if (!diary) return <p className="diaryDetail-empty">Not found</p>

   return (
     <article className="diaryDetail-article">
       <h3>{diary.title}</h3>
       <p className="text-muted">{diary.mood} • {new Date(diary.createdAt).toLocaleString()}</p>
       <p className="diaryDetail-content">{diary.content}</p>
       <div className="mt-3">
         <Button as={Link} to="/" variant="secondary">Back</Button>
       </div>
     </article>
   )
 }
