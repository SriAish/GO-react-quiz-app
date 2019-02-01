package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Question struct {
   ID uint `json:"id"`
   Genre string `json:"genre"`
   Question string `json:"question"`
   Quiz string `json:"quiz"`
   Answer1 string `json:"answer1"`
   A1 string `json:"a1"`
   Answer2 string `json:"answer2"`
   A2 string `json:"a2"`
   Answer3 string `json:"answer3"`
   A3 string `json:"a3"`
   Answer4 string `json:"answer4"`
   A4 string `json:"a4"`
}
type User struct {
   ID uint `json:"id"`
   Name string `json:"name"`
   Password string `json:"password"`
}
type Score struct {
   ID uint `json:"id"`
   User string `json:"user"`
   Genre string `json:"genre"`
   Quiz string `json:"quiz"`
   Score string `json:"score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&Question{})
   r := gin.Default()
   r.GET("/quiz/:gen/:no", Quiz)
   r.GET("/score/:gen/:no", QuizScore)
   r.GET("/question/", GetPeople)                             // Creating routes for each functionality
   r.GET("/question/:id", GetQuestion)
   r.GET("/scoreall", GetScore)
   r.POST("/userLog", LogUser)
   r.POST("/score", CreateScore)
   r.POST("/question", CreateQuestion)
   r.POST("/user", CreateUser)
   r.PUT("/question/:id", UpdateQuestion)
   r.DELETE("/question/:id", DeleteQuestion)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}


func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateQuestion(c *gin.Context) {
   var question Question
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&question)
   db.Save(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
}

func CreateQuestion(c *gin.Context) {
   var question Question
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
}

func CreateScore(c *gin.Context) {
   var score Score
   c.BindJSON(&score)
   fmt.Println(score)
   db.Create(&score)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, score)
}

func CreateUser(c *gin.Context) {
    var user User
   c.BindJSON(&user)
   name := user.Name
   if db.Where("name = ?", name).First(&user).RecordNotFound(){
       db.Create(&user)
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200,user)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(233,user)
  }
}

func LogUser(c *gin.Context) {
   var user User
    c.BindJSON(&user)
    name := user.Name
    pass := user.Password
   if db.Where("name = ? and password = ?", name, pass).First(&user).RecordNotFound(){
       c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(233,user)
   } else {
      fmt.Println(user)
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200,user)
  }
}

func GetQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, question)
   }
}

func GetPeople(c *gin.Context) {
   var people []Question
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}

func GetScore(c *gin.Context) {
   var score []Score
   if err := db.Find(&score).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
       fmt.Println(score)
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, score)
   }
}

func Quiz(c *gin.Context) {
   var people []Question
   gen := c.Params.ByName("gen")
   no := c.Params.ByName("no")
   if err := db.Where("genre = ? and quiz = ?", gen, no).Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}

func QuizScore(c *gin.Context) {
   var score []Score
   gen := c.Params.ByName("gen")
   no := c.Params.ByName("no")
   if err := db.Where("genre = ? and quiz = ?", gen, no).Find(&score).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, score)
   }
}
