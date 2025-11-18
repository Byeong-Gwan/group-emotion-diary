 import { Link } from 'react-router-dom'
 import { Button, Card } from 'react-bootstrap'
 import './DiaryListPage.style.css'

 // 아주 단순한 목업 데이터 (실제 API 연결 전)
 const mockDiaries = [
   { id: '1', title: 'First', content: 'First diary content', mood: 'neutral', createdAt: new Date().toISOString() },
   { id: '2', title: 'Second', content: 'Second diary content', mood: 'happy', createdAt: new Date().toISOString() }
 ]

 export default function DiaryListPage() {
   return (
     <>
       <div className="d-flex justify-content-between align-items-center mb-3">
         <h3>Diaries</h3>
         <Button as={Link} to="/diary/new">New</Button>
       </div>
       <div className="d-grid gap-3">
         {mockDiaries.map((d) => (
           <Card key={d.id} className="diaryList-card">
             <Card.Body>
               <Card.Title>{d.title}</Card.Title>
               <Card.Text>{d.content.slice(0, 80)}...</Card.Text>
               <Button as={Link} to={`/diary/${d.id}`} variant="outline-primary">Detail</Button>
             </Card.Body>
           </Card>
         ))}
       </div>
     </>
   )
 }
