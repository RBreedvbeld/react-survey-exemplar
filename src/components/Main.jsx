import { useState } from "react";
import {
  SurveyForm,
  AnswersList
} from '.'

const initialFormData = {
  color: '',
  timeSpent: [],
  review: '',
  username: '',
  email: ''
}

function Main() {
  const [open, setOpen] = useState(false); //Ignore this state
  const [formData, setFormData] = useState(initialFormData)
  const [answers, setAnswers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setAnswers([...answers, formData])
    setFormData({
      color: '',
      timeSpent: [],
      review: '',
      username: '',
      email: ''
    })
  }

  const handleChange = (e) => {
    const {name, type, value, checked} = e.target
    if (type === "checkbox" && name === "spend-time") {
      let copySpendTime = [...formData.timeSpent]
      if (copySpendTime.includes(value) && !checked) {
        // deselect
        copySpendTime = copySpendTime.filter(item => item !== value)
      } else if (!copySpendTime.includes(value) && checked){
        // select
        copySpendTime.push(value)
      }
      setFormData({...formData, timeSpent: copySpendTime})
    } else {
      setFormData({...formData, [name]: value})
    }
  }

  return (
    <main className="main">
      <section className={`main__list ${open ? "open" : ""}`}>
        <h2>Answers list</h2>
        <AnswersList answersList={answers} />
      </section>
      <section className="main__form">
        <SurveyForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </section>
    </main>
  );
}

export default Main;
