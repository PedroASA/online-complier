module example.com/main

go 1.16

require (
	example.com/db v0.0.0-00010101000000-000000000000
	github.com/google/go-cmp v0.5.5
	github.com/gorilla/mux v1.8.0
	github.com/julienschmidt/httprouter v1.3.0
)

replace example.com/db => ../db
