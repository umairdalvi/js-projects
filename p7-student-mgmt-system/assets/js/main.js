document.addEventListener("DOMContentLoaded", function () {
    const nameField = document.getElementById("studentName");
    const ageField = document.getElementById("studentAge");
    const courseField = document.getElementById("studentCourse");
    const idField = document.getElementById("studentId");
    const genderField = document.querySelectorAll("input[name='studentGender']");
    const studentForm = document.getElementById("studentForm");
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const studentsContainer = document.getElementById("studentsContainer");
    const searchInput = document.getElementById("searchInput");
    const totalStudents = document.getElementById("totalStudents");
    const successMessage = document.getElementById("successMessage");

    const nameError = document.getElementById("nameError");
    const ageError = document.getElementById("ageError");
    const genderError = document.getElementById("genderError");
    const idError = document.getElementById("idError");
    const courseError = document.getElementById("courseError");

    const formTitle = document.getElementById("formTitle");

    let editIndex = -1;
    let editActive = false;
    const nameRegex = /^\s*[A-Za-z][A-Za-z\s'-]*$/;

    class Student {
        constructor(name, age, gender, id, course) {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.id = id;
            this.course = course;
        }
        getName() { return this.name; }
        getAge() { return this.age; }
        getGender() { return this.gender; }
        getCourse() { return this.course; }
        getId() { return this.id; }
    }

    class StudentManager {
        constructor() {
            this.students = [];
        }

        searchStudents(query) {
            if (!query) return this.students;
            const searchTerm = query.toLowerCase();
            return this.students.filter(student =>
                student.getName().toLowerCase().includes(searchTerm) ||
                student.getId().toLowerCase().includes(searchTerm) ||
                student.getCourse().toLowerCase().includes(searchTerm)
            );
        }

        isIdExists(id) {
            return this.students.some(student => student.getId() === id);
        }

        addStudent(student) {
            this.students.push(student);
            showSuccessMessage("Student added successfully");
            resetForm();
        }

        deleteStudent(id, renderStudents, updateStats) {
            const deleteIdx = this.students.findIndex(student => student.id === id);
            const student = this.students[deleteIdx];

            Swal.fire({
                icon: "warning",
                title: "Confirm Deletion",
                html: `Are you sure you want to delete student <br> <strong>${student.name}</strong> with <strong>ID: ${id}</strong> ?`,
                showDenyButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    showSuccessMessage("Student deleted successfully");
                    this.students.splice(deleteIdx, 1);
                    renderStudents();
                    updateStats();
                }
            });
        }

        getStudentList() { return this.students; }
        getStudentCount() { return this.students.length; }

        editStudentInfo(index) {
            resetForm();
            cancelBtn.innerText = "Cancel";
            formTitle.innerText = "Edit Student";
            editActive = true;
            editIndex = index;

            $(submitBtn).html(`<span><i class="fa-solid fa-pencil"></i></span> Update`)
                .removeClass("btn-primary").addClass("btn-success");

            const studentToUpdate = this.students[index];
            nameField.value = studentToUpdate.name;
            ageField.value = studentToUpdate.age;
            idField.value = studentToUpdate.id;
            $(courseField).val(studentToUpdate.course).niceSelect('destroy').niceSelect();
            genderField.forEach(r => r.checked = (r.value === studentToUpdate.gender));
        }
    }

    function resetForm() {
        studentForm.reset();
        $(".validation-error").removeClass("validation-error");
        $(".error-message").hide();
        $("#studentCourse").niceSelect('destroy').niceSelect();
        formTitle.textContent = 'Add New Student';
        $(submitBtn).html('<span><i class="fa-solid fa-plus"></i></span> Add Student')
            .removeClass('btn-success').addClass('btn-primary');
        cancelBtn.innerText = "Clear";
        editActive = false;
        editIndex = -1;
    }

    function showSuccessMessage(message) {
        successMessage.textContent = message;
        $(successMessage).show().delay(3000).fadeOut();
    }

    function validateForm(studentManager) {
        $(".validation-error").removeClass("validation-error");
        $(".error-message").hide();

        let isValid = true;
        const name = nameField.value.trim();
        const age = parseInt(ageField.value, 10);
        const id = idField.value.trim();
        let gender = null;
        genderField.forEach(r => { if (r.checked) gender = r.value; });
        const course = courseField.value;

        if (!name) {
            $(nameField).addClass('validation-error');
            nameError.textContent = 'Name is required';
            $(nameError).show(); isValid = false;
        } else if (!nameRegex.test(name)) {
            $(nameField).addClass('validation-error');
            nameError.textContent = 'Please enter a valid name';
            $(nameError).show(); isValid = false;
        }

        if (!age) {
            $(ageField).addClass('validation-error');
            ageError.textContent = 'Age is required';
            $(ageError).show(); isValid = false;
        }
        if (!gender) {
            $('.radio-label').addClass('validation-error');
            genderError.textContent = 'Gender is required';
            $(genderError).show(); isValid = false;
        }
        if (!id) {
            $(idField).addClass('validation-error');
            idError.textContent = 'Student ID is required';
            $(idError).show(); isValid = false;
        } else {
            let duplicateId = false;
            if (editActive && editIndex !== -1) {
                duplicateId = studentManager.students.some(
                    (student, idx) => student.getId() === id && idx !== editIndex
                );
            } else {
                duplicateId = studentManager.isIdExists(id);
            }
            if (duplicateId) {
                $(idField).addClass('validation-error');
                idError.textContent = 'ID already exists';
                $(idError).show(); isValid = false;
            }
        }
        if (course === "default") {
            $(".nice-select.form-control").addClass('validation-error');
            courseError.textContent = 'Course is required';
            $(courseError).show(); isValid = false;
        }
        return isValid;
    }

    const studentManager = new StudentManager();

    function updateStats() {
        totalStudents.textContent = studentManager.getStudentCount();
    }

    function renderStudents(studentsToRender = null) {
        const students = studentsToRender || studentManager.getStudentList();
        if (students.length === 0) {
            studentsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>${currentSearchQuery ? 'No students found' : 'No students added yet'}</h3>
                    <p>${currentSearchQuery ? 'Try adjusting your search criteria' : 'Add your first student to get started'}</p>
                </div>`;
            return;
        }
        studentsContainer.innerHTML = `<table class="student-table">
            <thead>
                <tr><th>Name</th><th>Student ID</th><th>Course</th><th>Age</th><th>Gender</th><th>Actions</th></tr>
            </thead>
            <tbody>
                ${students.map(s => `
                <tr class="fade-in">
                    <td><strong>${s.getName()}</strong></td>
                    <td>${s.getId()}</td>
                    <td>${s.getCourse()}</td>
                    <td>${s.getAge()}</td>
                    <td>${s.getGender()}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-warning btn-small edit-btn" id="${s.getId()}">
                                <span><i class="fa-solid fa-pencil"></i></span>Edit
                            </button>
                            <button class="btn btn-danger btn-small delete-btn" id="${s.getId()}">
                                <span><i class="fa-solid fa-trash"></i></span> Delete
                            </button>
                        </div>
                    </td>
                </tr>`).join('')}
            </tbody>
        </table>`;
    }

    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!validateForm(studentManager)) return;

        const name = nameField.value.trim();
        const age = parseInt(ageField.value, 10);
        const course = courseField.value;
        const id = idField.value.trim();
        let gender = null;
        genderField.forEach(r => { if (r.checked) gender = r.value; });

        if (editActive && editIndex !== -1) {
            let student = studentManager.students[editIndex];
            student.name = name;
            student.age = age;
            student.course = course;
            student.id = id;
            student.gender = gender;
            studentManager.students[editIndex] = student;
            renderStudents();
            showSuccessMessage("Student updated successfully.");
            resetForm();
            return;
        }

        const student = new Student(name, age, gender, id, course);
        studentManager.addStudent(student);
        renderStudents();
        updateStats();
    });

    document.addEventListener("click", function (e) {

        const editBtn = e.target.closest(".edit-btn");
        const deleteBtn = e.target.closest(".delete-btn");

        if (editBtn) {
            const idx = studentManager.students.findIndex(s => s.id === editBtn.id);
            studentManager.editStudentInfo(idx);
        } else if (deleteBtn) {
            studentManager.deleteStudent(deleteBtn.id, renderStudents, updateStats);
        }
    })

    searchInput.addEventListener("input", function () {
        currentSearchQuery = this.value.trim();
        const filtered = studentManager.searchStudents(currentSearchQuery);
        renderStudents(filtered);
    });

    cancelBtn.addEventListener("click", resetForm);

    $("#studentCourse").niceSelect();

    let currentSearchQuery = "";
});