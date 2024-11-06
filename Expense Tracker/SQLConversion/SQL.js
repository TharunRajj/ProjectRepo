var str = "";
const link = document.createElement("a");
function readSingleFile(evt) {
  var f = evt.target.files[0];
  if (f) {
    var r = new FileReader();
    r.onload = function (e) {
      var contents = e.target.result;
      document.write(
        "File Uploaded! <br />" +
          "Name: " +
          f.name +
          "<br />" +
          "Type: " +
          f.type +
          "<br />" +
          "Size: " +
          f.size +
          " bytes <br />"
      );
      var lines = contents.split("\n");
      lines.pop(lines.length);
      // document.write(lines.length);
      var index = 0;
      var arr = [];
      var output = [];
      let length;
      let total;
      let n = 20000;
      let m = 20001;
      //total = lines.length > 20000 ? 20000 : lines.length;
      //var initialize = 0;
      //length = Math.ceil(lines.length / 20000);
      //for (m = 1; m <= length; m++) {
      //document.write(i+"he"+"<br></br>");
      for (var i = 0; i < lines.length; i++) {
        if (i == 0 || i == m) {
          str =
            str +
            `${
              "INSERT INTO prot.prot.condition(" +
              lines[0] +
              "created_by,created_at,updated_by,updated_at,tenant_id) VALUES"
            }`;
          arr = lines[i].split(",");
          for (k = 0; k < arr.length; k++) {
            if (arr[k] == "purchase_unit_price") {
              index = k;
            }
          }
          //document.write(i);
        }

        if (i !== 0) {
          //document.write(i);
          output = lines[i]?.split(",");
          //document.write(lines[i]+"<br></br>");
          for (j = 0; j < arr.length; j++) {
            if (j == 0) {
              str =
                str + "('" + `${output[j] === "" ? "NULL" : output[j]}` + "',";
            }
            if (j > 0 && j != output.length) {
              str =
                str +
                `${index != j && output[j] != "" ? "'" : ""}` +
                `${output[j] === "" ? "NULL" : output[j]}` +
                `${index != j && output[j] != "" ? "'" : ""}` +
                `${j != output.length - 1 ? "," : ""}`;
            }
            if (j == output.length - 1) {
              str =
                str +
                ",'tharun',now(),'tharun',now(),'yuika')" +
                `${i == lines.length - 1 || i == n ? ";" : ","}`;
            }
          }
          str = str + "\n";
        }
        if (i == m) {
          n = n + 20000;
          m = n + 1;
        }
      }
      // if (total < lines.length) {
      //initialize = initialize + 20000;
      //total = total + 20000;
      //if (total > lines.length) {
      //  total = lines.length;
      // }
      //i = initialize;
      //document.write(i);
      //} else {
      //total = lines.length;
      //}
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(str)
      );
      element.setAttribute("download", "Test");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      //}
      //str = "";
      //document.write(str);
    };
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}
document.getElementById("fileinput").addEventListener("change", readSingleFile);
