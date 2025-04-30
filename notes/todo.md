# Todo
- ✅ create project structure
- ❌ ? define endpoints
- ✅ define schemas 
- ❌ Finish Validators
- ❌ Controller
- ❌ Landing Page 
- ❌ Register page 
- ❌ Login Page

# Planning
Pages:
    landing page (mia) (only fornt-end)
    register page (mia)
    login page (mia)

## Endpoints

POST /researcher/register
POST /researcher/login

[GET, POST] /researcher
[GET, PUT, DELETE] /researcher/:id/

[GET] /researcher/:id/borrowed-books
[GET, POST, DELETE] /researcher/:id/borrowed-books/:bookid


# Database structure
we will only have one database

## how many collections?
researcher collection
sessions collection
    the responses will be in here
    sessions will be linked to correct study with studyId in body
studies collection
    embedded questions (we think)
    will be linked with user, userId in body to know who owns the study, and have authorisation
artefacts collection



