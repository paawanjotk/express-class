const express = require("express");
const app = express();
app.use(express.json());
app.use(loggerMiddleware);
let courses = [
  { id: 1, name: "java" },
  { id: 2, name: "javascript" },
  { id: 3, name: "python" },
];
app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  console.log(req.body);
  const singleCourse = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(singleCourse);
  res.send(courses);
});
app.put("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  course.name = req.body.name;
  res.send(course);
});
app.delete("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  const courseId = parseInt(req.params.id);
  courses.splice(courseId-1, 1);
  res.send(course);
});
function loggerMiddleware(req, res, next){
    console.log("middleware");
    const { method, ip, hostname } = req;
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${method} ${ip} ${hostname}`);
    next();
}
//logger middleware:
//method, ip, hostname, date 

app.listen(3000, () => {
  console.log(`Server is running on port`);
});
