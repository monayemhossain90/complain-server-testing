const app = require("./app.js");


app.get("/", (req, res) => {
    res.send("This is Complain Management Api")
})

app.listen(5000, () =>
    console.log("Server running on port 5000.")
);