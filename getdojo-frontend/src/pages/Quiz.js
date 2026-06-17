import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const questions = [
    {
      id: 1,
      question: "What is the difference between an Oi-Zuki and a Gyaku-Zuki?",

      options: ["A. Oi-Zuki is a front fist with a 45 degree hip twist and Gyaku-Zuki is a front fist with a full (90 degree) hip twist",

       "B. Oi-Zuki is a front fist with a full (90 degree) hip twist and Gyaku-Zuki is a front fist with a 45 degree hip twist",

        "C. Gyaku-Zuki is a front kick (mostly to the torso area) with stretched toes pointing up and Oi-Zuki is a back kick with a side ankle",

         "D. Oi-Zuki is a front kick (mostly to the torso area) with stretched toes pointing up and Gyaku-Zuki is a back kick with a side ankle"],
      answer: "A. Oi-Zuki is a front fist with a 45 degree hip twist and Gyaku-Zuki is a front fist with a full (90 degree) hip twist",
    },
    {
      id: 2,
      question: "Who is known as the founder of Shotokan karate? He is also known as \"The Father of Modern Karate.\"",

      options: ["A. Gichin Funakoshi",

       "B. Kazumi Tabata",

        "C. Takayuki Mikami",

         "D. Bruce Lee" ],

      answer: "A. Gichin Funakoshi",
    },
    {
      id: 3,
      question: "What is the first move you learn as a beginner?",

      options: ["A. Kihon",

       "B. Throwing Techniques",

        "C. Unsu Kata",

         "D. Jiyu Ippon Kumite" ],

      answer: "A. Kihon",
    },
    {
      id: 4,
      question: "Edmund Kealoha Parker was widely known as who?",

      options: ["A. The Father of American Karate",

       "B. The Father of French Karate",

        "C. The Father of Bulgarian Karate",

         "D. The Father of German Karate" ],

      answer: "A. The Father of American Karate",
    },
    {
      id: 5,
      question: "White gloves have been banned for some time now on WKF-tournaments. Which glove colors are allowed?",

      options: ["A. Red gloves for \"Aka\" and blue gloves for \"Ao\"",

       "B. Blue gloves for \"Aka\" and red gloves for \"Ao\"",

        "C. Black gloves for \"Aka\" and blue gloves for \"Ao\"",

         "D. Blue gloves for \"Aka\" and black gloves for \"Ao\"" ],

      answer: "A. Red gloves for \"Aka\" and blue gloves for \"Ao\"",
    },
    {
      id: 6,
      question: "What does the Japanese word \"Karate\" mean in English?",

      options: ["A. Empty Hand",

       "B. Full Hand",

        "C. Eyes to the Sun",

         "D. Relaxed Mind" ],

      answer: "A. Empty Hand",
    },
    {
      id: 7,
      question: "What does \"Muwate\" mean?",

      options: ["A. Turn",

       "B. Kick",

        "C. Throw",

         "D. Breathe" ],

      answer: "A. Turn",
    },
    {
      id: 8,
      question: "Hakutsuru is an ancient Chinese form (kata) which is said to have influenced several Shorin-Ryu kata. What does the name \"Hakutsuru mean\"?",

      options: ["A. White Crane",

       "B. Black Crane",

        "C. White Eagle",

         "D. Black Eagle" ],

      answer: "A. White Crane",
    },
    {
      id: 9,
      question: "In what year was Shotokan-Karate founded?",

      options: ["A. 1936",

       "B. 1876",

        "C. 1915",

         "D. 1910" ],

      answer: "A. 1936",
    },
    {
      id: 10,
      question: "In Shotokan Karate, the chain of the belts a trainee can advance is what?",

      options: ["A. White, Yellow, Orange, Green, Blue (2 levels), Brown (3 levels), and Black (10 levels)",

       "B. White, Orange, Yellow, Purple, Blue, Green, Brown (3 levels), and Black (9 levels)",

        "C. White, Yellow, Green, Orange, Blue, Brown (3 levels), and Black (10 levels)",

         "D. White, Yellow, Orange, Green, Blue (3 levels), Brown (2 levels), and Black (9 levels)" ],

      answer: "A. White, Yellow, Orange, Green, Blue (2 levels), Brown (3 levels), and Black (10 levels)",
    }
    
   
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
      }
    });
    if (correct === questions.length) {
      // All answers are correct
      setSubmitted(true);
    } else {
      setSubmitted("lost");
    }
  };

  const handleAnswerChange = (id, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: answer }));
  };

  if (submitted === true) {
    return (
      <Box className="congratsPage" sx={{ minHeight: "100vh", py: 6, display: "grid", placeItems: "center" }}>
        <Card sx={{ width: "min(92vw, 720px)", textAlign: "center", borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
              Congrats!
            </Typography>
            <Box component="img" className="chuck-norris-congrats" src="https://res.cloudinary.com/iujg6ghfdf/image/upload/v1685371066/Congrats-Chuck_bsicb5.jpg" alt="chuck-norris-congrats" sx={{ width: "100%", maxWidth: 520, borderRadius: 3 }} />
            <Stack alignItems="center" sx={{ mt: 2.3 }}>
              <Button variant="contained" onClick={() => { window.location.href = "/home-page"; }}>
                Back to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  } else if (submitted === "lost") {
    return (
      <Box className="youLostPage" sx={{ minHeight: "100vh", py: 6, display: "grid", placeItems: "center" }}>
        <Card sx={{ width: "min(92vw, 720px)", textAlign: "center", borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
              You lost!
            </Typography>
            <Box component="img" className="chuck-norris-onions" src="https://res.cloudinary.com/iujg6ghfdf/image/upload/v1685370897/59dec6cfd79ee9828f52a5984e59216b_lqajq1.jpg" alt="chuck-norris-onions" sx={{ width: "100%", maxWidth: 400, borderRadius: 3 }} />
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={1.2} sx={{ mt: 2.4 }}>
              <Button variant="contained" onClick={() => window.location.reload()}>
                Try again
              </Button>
              <Button variant="outlined" onClick={() => { window.location.href = "/home-page"; }}>
                Back to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="quizPage" sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ pt: 13, pb: 5 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
              Dojo Quiz
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {questions.map((q) => (
                  <Card key={q.id} variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <FormControl fullWidth>
                        <FormLabel sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>{q.question}</FormLabel>
                        <RadioGroup
                          name={String(q.id)}
                          value={answers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        >
                          {q.options.map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                ))}

                <Stack alignItems="center" sx={{ pt: 1 }}>
                  <Button type="submit" variant="contained" size="large">
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Quiz;
