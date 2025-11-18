 import { useState } from 'react'
 import { Button, Form } from 'react-bootstrap'
 import { useNavigate } from 'react-router-dom'
 import './DiaryCreatePage.style.css'

 export default function DiaryCreatePage() {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const [mood, setMood] = useState('neutral')
   const nav = useNavigate()

   const onSubmit = (e) => {
     e.preventDefault()
     // 목업: 저장했다고 가정하고 목록으로 이동
     nav('/')
   }

   return (
     <Form onSubmit={onSubmit} className="diaryCreate-form">
       <h3 className="mb-3">New Diary</h3>
       <Form.Group className="mb-2">
         <Form.Label>Title</Form.Label>
         <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
       </Form.Group>
       <Form.Group className="mb-2">
         <Form.Label>Content</Form.Label>
         <Form.Control as="textarea" rows={6} value={content} onChange={(e) => setContent(e.target.value)} required />
       </Form.Group>
       <Form.Group className="mb-3">
         <Form.Label>Mood</Form.Label>
         <Form.Select value={mood} onChange={(e) => setMood(e.target.value)}>
           <option value="neutral">neutral</option>
           <option value="happy">happy</option>
           <option value="sad">sad</option>
           <option value="angry">angry</option>
         </Form.Select>
       </Form.Group>
       <Button type="submit">Create</Button>
     </Form>
   )
 }
