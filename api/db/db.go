package db

import (
	"database/sql"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

var (
	host     = "localhost"
	port     = "5432"
	user     = "postgres"
	password = "password"
	dbname   = "code"
)

func init() {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	host = os.Getenv("HOST")
	port = os.Getenv("PORT")
	user = os.Getenv("USER")
	password = os.Getenv("PASSWORD")
	dbname = os.Getenv("DBNAME")

	db, err = OpenDb()
}

func OpenDb() (db *sql.DB, err error) {

	// connection string
	psqlconn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// open database
	db, err = sql.Open("postgres", psqlconn)
	if err != nil {
		return
	}

	// check db
	err = db.Ping()

	return
}

type Code struct {
	Title, Lang, Content string
	Last_updated_at      time.Time
}

func CreateCode(title, language, content string) error {

	_, err := db.Exec(fmt.Sprintf(`
  INSERT INTO schm.files (title, lang, content)
  VALUES ('%s', '%s', '%s')`, title, language, content))

	return err

}

func ReadCode(title string) (code Code, err error) {

	sqlStatement := fmt.Sprintf(`SELECT * FROM schm.files where title = '%s'`, title)
	row := db.QueryRow(sqlStatement)
	err = row.Scan(&code.Title, &code.Content, &code.Lang, &code.Last_updated_at)
	switch err {
	case sql.ErrNoRows:
		return Code{}, errors.New("No file with give title!")
	case nil:
		return
	default:
		return Code{}, err

	}
}

func UpdateCode(title, content string) (err error) {
	if _, err = ReadCode(title); err == nil {
		_, err = db.Exec(fmt.Sprintf(`
	UPDATE schm.files SET content = '%s' WHERE title = '%s'`,
			content, title))
		return
	}
	return

}

func DeleteCode(title string) (err error) {

	if _, err = ReadCode(title); err == nil {
		_, err = db.Exec(fmt.Sprintf(`
  DELETE FROM schm.files WHERE title = '%s'`, title))
		return
	}
	return

}

func AllCodes() (codes []*Code, err error) {
	rows, err := db.Query("SELECT title, content, lang, last_updated_at FROM schm.files")
	if err != nil {
		return
	}

	defer rows.Close()

	codes = make([]*Code, 0)

	for rows.Next() {
		code := new(Code)
		err = rows.Scan(&code.Title, &code.Content, &code.Lang, &code.Last_updated_at)
		if err != nil {
			return make([]*Code, 0), err
		}
		codes = append(codes, code)
	}
	return
}
