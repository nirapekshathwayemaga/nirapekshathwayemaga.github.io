var formIds = [
	"email",
	"telNo",
	"depositAmount",
	"receiptNo",
	"depositDate",
	"purpose",
	"contributors",
	"blessings",
	"deceased"
];

	/* 
	https://docs.google.com/forms/d/e/1FAIpQLScJnaLsfQEOH0EXh1L1nDtABXtUXGG3KenCF2lHa8_nC7Z5iQ/viewform?usp=pp_url&
	entry.2037969843=Email&
	entry.964815224=telno&
	entry.28857832=amount&
	entry.124663908=recipetno&
	entry.605614856=2022-11-02&
	entry.1729097141=%E0%B6%89%E0%B6%BD%E0%B6%9F+-+Upcoming&
	entry.1730104430=%E0%B7%81%E0%B7%8A%E2%80%8D%E0%B6%BB%E0%B7%93+%E0%B7%83%E0%B6%AF%E0%B7%8A%E0%B6%B0%E0%B6%BB%E0%B7%8A%E0%B6%B8+%E0%B7%83%E0%B7%8F%E0%B6%9A%E0%B6%A0%E0%B7%8A%E0%B6%A1%E0%B7%8F+%E0%B6%B8%E0%B7%8F%E0%B6%BD%E0%B7%8F%E0%B7%80:+Dhamma+Discussion+Program&
	entry.332481668=contributord&
	entry.129668403=blessings&
	entry.600323329=dead
*/
var formJson = JSON.parse('{\
	"title": "Donation Forms",\
	"url": "https://docs.google.com/forms/d/e/1FAIpQLScJnaLsfQEOH0EXh1L1nDtABXtUXGG3KenCF2lHa8_nC7Z5iQ/formResponse",\
	"fields": {\
	  "email": "2037969843",\
	  "telNo": "964815224",\
	  "depositAmount": "28857832",\
	  "receiptNo": "124663908",\
	  "depositDate": "605614856",\
	  "purpose": "1730104430",\
	  "contributors": "332481668",\
	  "blessings": "129668403",\
	  "deceased": "600323329"\
	}\
  }');

function submitDonationForm(){
	// var url = formJson.url + "?embedded=true&submit=Submit&";

	var data ={}
	for (let i = 0; i < formIds.length; i++) {
		var elementName =  formIds[i];
		var elementVaule =  $("#"+formIds[i]).val();
		data[elementName] = elementVaule;
		window.localStorage.setItem(elementName, elementVaule);
	}

	var formData ={}
	for (var property in data) {
		if (data.hasOwnProperty(property) && formJson.fields.hasOwnProperty(property)) {
			console.log("entry." + formJson.fields[property] + "=" + data[property] + "&");
			// url += "entry." + formJson.fields[property] + "=" + data[property] + "&";
			formData["entry." + formJson.fields[property]] = data[property];
		}
	}

	// $('#donationForm').attr('src', url)
	//<iframe id="donationForm" width="800" height="2500" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
	// var frame = $('<iframe/>', {
	// 	id: 'donationForm-frame',
	// 	src: url,
	// 	width:"800",
	// 	height:"2500",
	// 	frameborder:"0",
	// 	marginheight:"0",
	// 	marginwidth:"0"
	// });
	
	// $('#form-wrapper').html(frame);
	// }).appendTo('#form-wrapper');

	postToGoogle("1FAIpQLScJnaLsfQEOH0EXh1L1nDtABXtUXGG3KenCF2lHa8_nC7Z5iQ", formData);
}

function postToGoogle(id, dat) {
		$.post("https://docs.google.com/forms/d/e/"+id+"/formResponse",
		dat,
		function (result, status, xhr) {
			$("#message").html(result);
		}
		).fail(function (xhr, status, error) {
			$("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
		});
    }

$( document ).ready(function() {
	for (let i = 0; i < formIds.length; i++) {
		$("#"+formIds[i]).val(window.localStorage.getItem(formIds[i]));
	}
});