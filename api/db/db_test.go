package db

import (
	"testing"

	"github.com/google/go-cmp/cmp"
)

const init_code = `
CREATE SCHEMA SCHM
	CREATE TABLE SCHM.Files (
		title VARCHAR(30) PRIMARY KEY,
		content TEXT,
		lang VARCHAR(30),
		last_updated_at timestamp
	);
	
	CREATE OR REPLACE FUNCTION SCHM.add_timestamp()
	RETURNS TRIGGER AS $$
	BEGIN
		New.last_updated_at = NOW();
		RETURN New;
	END;
	$$ LANGUAGE plpgsql;
	
	
	CREATE TRIGGER auto_ts
		BEFORE INSERT OR UPDATE ON SCHM.FILES
		FOR EACH ROW
		EXECUTE PROCEDURE SCHM.add_timestamp();
		
	INSERT INTO SCHM.FILES VALUES ('READTEST', 'TEST_CONTENT', 'TEST_LANG');
	INSERT INTO SCHM.FILES VALUES ('UPDATETEST', 'TEST', 'TEST');
	INSERT INTO SCHM.FILES VALUES ('DELETETEST', 'TEST', 'TEST');`

func init() {
	_, err := db.Exec(init_code)
	if err != nil {
		panic(err)
	}
}

func TestDB(t *testing.T) {
	t.Cleanup(Cleanup)

	t.Run("Valid Insertion", func(t *testing.T) {
		t.Parallel()
		if err := CreateCode("t1", "javascript", "console.log(`Hello`)"); err != nil {
			t.Fatalf("An unexpected error was returned: %v", err)
		}
	})

	t.Run("Invalid Insertion", func(t *testing.T) {
		t.Parallel()
		if err := CreateCode("t1", "javasasd", "Invalid title"); err == nil {
			t.Fatalf("Expected error did not occur")
		}
	})

	t.Run("Valid Read", func(t *testing.T) {
		t.Parallel()
		ValidRead(t, "READTEST", Code{Title: "READTEST", Lang: "TEST_LANG", Content: "TEST_CONTENT"})

	})

	t.Run("Invalid Read", func(t *testing.T) {
		t.Parallel()
		InvalidRead(t, "TITLEDOESNOTEXIST")
	})

	t.Run("Valid Update", func(t *testing.T) {
		t.Parallel()
		if err := UpdateCode("UPDATETEST", "NEW CONTENT"); err != nil {
			t.Fatalf("An unexpected error was returned: %v", err)
		}
		ValidRead(t, "UPDATETEST", Code{Title: "UPDATETEST", Lang: "TEST", Content: "NEW CONTENT"})
	})

	t.Run("Invalid Update", func(t *testing.T) {
		t.Parallel()
		if err := UpdateCode("TITLEDOESNOTEXIST", "content"); err == nil {
			t.Fatalf("Expected error did not occur")
		}
	})

	t.Run("Valid Deletion", func(t *testing.T) {
		t.Parallel()
		if err := DeleteCode("DELETETEST"); err != nil {
			t.Fatalf("An unexpected error was returned: %v", err)
		}
		InvalidRead(t, "DELETETEST")
	})

	t.Run("Invalid Deletion", func(t *testing.T) {
		t.Parallel()
		if err := DeleteCode("TitleDoesNotExist"); err == nil {
			t.Fatalf("Expected error did not occur")
		}
	})

	t.Run("All Codes", func(t *testing.T) {
		t.Parallel()
		codes, err := AllCodes()
		if err != nil {
			t.Fatalf("An unexpected error was returned: %v", err)
		}
		if len(codes) < 2 || codes[0].Title != "READTEST" {
			t.Fatalf("Returned value is not appropriate")
		}

	})

}

func Cleanup() {
	db.Exec("drop schema schm cascade;")
	defer db.Close()
}

func ValidRead(t *testing.T, title string, want_code Code) {
	code, err := ReadCode(title)
	if err != nil {
		t.Fatalf("An unexpected error was returned: %v", err)
	}
	if code.Content != want_code.Content {
		t.Errorf("Content mismatch: (-want +got)\n -%v\n +%v", want_code.Content, code.Content)
	}
	if code.Title != want_code.Title {
		t.Errorf("Title mismatch: (-want +got)\n -%v\n +%v", want_code.Title, code.Title)
	}
	if code.Lang != want_code.Lang {
		t.Errorf("Lang mismatch: (-want +got)\n -%v\n +%v", want_code.Lang, code.Lang)
	}
}

func InvalidRead(t *testing.T, title string) {
	code, err := ReadCode(title)
	if err == nil {
		t.Fatalf("Expected error did not occur")
	}
	want_code := Code{}
	if diff := cmp.Diff(want_code, code); diff != "" {
		t.Errorf("Code mismatch (-want +got):\n%s", diff)
	}
}
