const URL = "http://localhost:8090";
populatePage();

//prevent form submit and hides all modals
$(".form").on("submit", e => {
    e.preventDefault();
    $(".modal").modal("hide");
});

//modals control
$("#add-person").on("click", () => $("#add-person-modal").modal("show"));
$("#locations-link").on("click", () => $("#location-modal").modal("show"));
$("#departments-link").on("click", () => $("#department-modal").modal("show"));

//buttons control
$("#add-person-form").on("submit", addPersonToDb);
$("#add-department").on("submit", addDepartmentToDb);
$("#add-location").on("submit", addLocationToDb);
$("#delete-department").on("submit", deleteDepartmentFromDb);
$("#delete-location").on("submit", deleteLocationFromDb);
$("#delete-person").on("click", deletePersonFromDb);
$("#edit-person").on("submit", editPerson);
// $("#search-button").on("click", () => document.getElementById("search").value = "");


$("#search").on("change keyup paste ", () => {
    let searchInput = document.getElementById("search").value.toUpperCase();
    let list = document.getElementsByClassName("person");

    for (let i = 0; i < list.length; i++) {
        let personDetails = list[i].querySelector("div p").innerHTML.split("<")[0].trim().split(" ");

        list[i].classList.add("d-none");

        personDetails.forEach(elem => {
            if (elem.toUpperCase().indexOf(searchInput) !== -1)
                list[i].classList.remove("d-none");
        });
    }
});


function populatePage() {
    $.ajax({
        url: URL + "/person/all",
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            //console.log(result);
            populatePersonnel(result);
            getDepartments();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText + "   " + errorThrown);
        }
    });
}

function getLocations() {
    $.ajax({
        url: URL + "/location/all",
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            // console.log(result);
            populateLocations(result);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText + "   " + errorThrown);
        }
    });
}

function getDepartments() {
    $.ajax({
        url: URL + "/department/all",
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (result) {
            populateDepartments(result);
            getLocations();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText + "   " + errorThrown);
            console.log("e")
        }
    });
}

function populateDepartments(departments) {
    departments.forEach((department) => {
        //add elements
        $(".departments").append(`<li class=\" department fs-4\" name="${"department" + department.id}"><div class="d-flex flex-row"><p>${department.name}</p><span class=" d-none align-self-center" name="departmentEndSorting">close</span></div></li>`);
        $(".department-select").append(`<option value=${department.id} name="${"department" + department.id}" class="department-option">${department.name}</option>`);
        //add sorting on click
        sortByDepartment(department, document.getElementById("departments-list").lastElementChild);
    });
}

function populatePersonnel(personnel) {
    //add <li> with person details
    personnel.forEach(person => {
        $(".personnel").append(`<li class="person  align-items-center row" name="person${person.id}"><span
                    class="col-auto initials text-center text-capitalize fs-3 align-items-center justify-content-center">${person.firstName.charAt(0) + person.lastName.charAt(0)}</span>
                <div class="col-auto"><p class="fs-4 row fullName">${person.firstName + " " + person.lastName + " "}<span
                        class="row">${person.departmentName + ", " + person.locationName}</span></p>
                </div>
            </li>`);

        //add event listener
        document.getElementById("personnel-list").lastElementChild.addEventListener("click", () => {
            //modify inputs based on person
            for (let key in person)
                if (document.getElementsByName(key).length > 0)
                    document.forms["edit-person"][key].value = person[key];

            $("#edit-person-modal").modal("show");
        });
    });
}

function populateLocations(locations) {
    locations.forEach(location => {
        $(".location-select").append(`<option value=${location.id} name="${"location" + location.id}" class="location">${location.name}</option>`);

    });
}

function addPersonToDb() {


    let person = {
        firstName: document.forms['addPerson']['firstName'].value,
        lastName: document.forms['addPerson']['lastName'].value,
        email: document.forms['addPerson']['email'].value,
        jobTitle: document.forms['addPerson']['jobTitle'].value,
        departmentID: document.forms['addPerson']['addPersonDepartmentName'].value,
    }


    $.ajax({
        url: URL + "/person/save",
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(person),

        success: function (result) {
            //console.log(result);
            $.alert("Person succesfully added!")

            populatePersonnel([result]);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
        }
    });

}

function addDepartmentToDb() {
    let dept = {
        name: document.forms["addDepartment"]["name"].value.trim(),
        locationID: document.forms["addDepartment"]["location"].value
    };

    if (dept.locationID !== null && dept.name !== null) {

        $.ajax({
            url: URL + "/department/save",
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(dept),

            success: function (result) {
                alert("Department added succesfully")
                populateDepartments([result]);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
            }
        });

    }
}

function addLocationToDb() {

    if (document.forms["addLocation"]["name"].value !== undefined) {

        $.ajax({
            url: URL + "/location/save",
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({name: document.forms["addLocation"]["name"].value}),

            success: function (result) {
                alert("Location added succesfully");
                populateLocations([result]);


            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
            }
        });

    }
}

function deletePersonFromDb() {

    $.confirm({
        title: 'Delete employee?',
        content: '',
        type: 'red',
        typeAnimated: true,
        autoClose: 'no|8000',
        buttons: {
            yes: {
                text: 'Yes',
                btnClass: 'btn-red',
                action: function () {

                    let personId = document.forms["edit-person"]["id"].value;

                    $.ajax({
                        url: URL + "/person/delete",
                        type: 'POST',
                        dataType: 'text',
                        contentType: "application/json",
                        data:personId,

                        success: function () {

                            $.alert("Employee deleted succesfully!!")
                            //hide the element
                            document.getElementsByName("person" + personId).forEach(e => e.remove());
                            $(".modal").modal("hide");
                        },
                        error: function (jqXHR, textStatus) {
                            console.warn(jqXHR.responseText  + textStatus);

                        }
                    });

                }
            },
            no: function () {
            }
        }
    });
}

function deleteLocationFromDb() {

    let locationId = document.forms["delete-location"]["id"].value;

    $.confirm({
        title: 'Delete location?',
        content: '',
        type: 'red',
        typeAnimated: true,
        autoClose: 'no|8000',
        buttons: {
            yes: {
                text: 'Yes',
                btnClass: 'btn-red',
                action: function () {
                    $.ajax({
                        url: URL + "/location/delete",
                        type: 'POST',
                        dataType: 'text',
                        contentType: "application/json",
                        data:locationId,

                        success: function (result) {
                            //console.log(result);
                            if (parseInt(result) === 0) {
                                $.alert("Location deleted succesfully!!")
                                // remove the element
                                document.getElementsByClassName("location").namedItem("location" + locationId).remove();
                            } else {
                                $.alert(`There are ${result} department(s) left in the location, please delete them before proceeding`)
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
                        }
                    });
                }
            },
            no: function () {
            }
        }
    });


}

function deleteDepartmentFromDb() {

    let departmentId = document.forms["delete-department"]["id"].value;

    $.confirm({
        title: 'Delete department?',
        content: '',
        type: 'red',
        typeAnimated: true,
        autoClose: 'no|8000',
        buttons: {
            yes: {
                text: 'Yes',
                btnClass: 'btn-red',
                action: function () {

                    $.ajax({
                        url: URL + "/department/delete",
                        type: 'POST',
                        dataType: 'text',
                        contentType: "application/json",
                        data:document.forms["delete-department"]["id"].value,

                        success: function (result) {

                            if (parseInt(result) === 0) {
                                $.alert("Department deleted succesfully!!")
                                //hide the element
                                document.getElementsByName("department" + departmentId).forEach(e => e.classList.add("d-none"));
                            } else {
                                $.alert(`There are ${result} persons left in the department, please delete them before proceeding`)
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
                        }
                    });
                }
            },
            no: function () {
            }
        }
    });


}

function editPerson() {

    let person = {
        id: document.forms["edit-person"]["id"].value,
        firstName: document.forms["edit-person"]["firstName"].value,
        lastName: document.forms["edit-person"]["lastName"].value,
        email: document.forms["edit-person"]["email"].value,
        jobTitle: document.forms["edit-person"]["jobTitle"].value,
        departmentID: document.forms["edit-person"]["departmentID"].value
    }


    $.confirm({
        title: 'save changes?',
        content: '',
        type: 'red',
        typeAnimated: true,
        autoClose: 'no|8000',
        buttons: {
            yes: {
                text: 'Yes',
                btnClass: 'btn-red',
                action: function () {
                    $.ajax({
                        url: URL + "/person/save",
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify(person),

                        success: function (result) {

                            //to be added ...
                            $.alert("edit succesfully!!")
                            //hide the element
                            document.getElementsByName("person" + person.id).forEach(e => e.remove());
                            populatePersonnel([result]);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.warn(jqXHR.responseText + "   " + errorThrown + textStatus);
                        }
                    });
                }
            },
            no: function () {
            }
        }
    });
}

function sortByDepartment(department, departmentHTML) {

    departmentHTML.querySelector("p").addEventListener("click", () => {


        //user cannot select to sort other department if doesent close sorting of previous one
        let otherDepartmentSelected = false;
        document.getElementsByName("departmentEndSorting").forEach(elem => {
            if (!elem.classList.contains("d-none"))
                otherDepartmentSelected = true;
        });
        if (!otherDepartmentSelected) {
            const personnelList = document.getElementsByClassName("person");

            for (let i = 0; i < personnelList.length; i++) {
                let departmentName = personnelList[i].querySelector("div p span").innerText.split(",")[0];

                personnelList[i].style.display = "";

                departmentHTML.querySelector("span").classList.remove("d-none");

                if (personnelList[i].classList.contains("d-none"))
                    continue;
                else if (departmentName !== department.name)
                    personnelList[i].style.display = "none";


                departmentHTML.querySelector("span").addEventListener("click", () => {
                    for (let i = 0; i < personnelList.length; i++) {
                        personnelList[i].style.display = "";
                    }

                    departmentHTML.querySelector("span").classList.add("d-none");

                })
            }
        }


    });
}





