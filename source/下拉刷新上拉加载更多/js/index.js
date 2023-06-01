/*
 * @Author: vannvan <https://github.com/vannvan>
 * @Date:   2019-09-04 15:27:57
 * @Last Modified by:   vannvan
 * @Last Modified time: 2019-09-05 16:38:36
 */
var reqContent = {};
const objectToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
var pageSize = 10;
var page = 1;
var totalSize = 0;

$(function () {
  // var packageName = $.base64.encode("{\"packageName\":\"your://packagename\"}");
  // window.location.href = 'qtapp://api/userinfo/'+	packageName;
  var content = { userId: 4214476, schoolId: 5722, areaAbb: "hz", role: 2 };
  getAppUserInfo(content);
});
function getAppUserInfo(content) {
  reqContent.areaAbb = content.areaAbb;
  reqContent.userId = content.userId;
  reqContent.schoolId = content.schoolId;
  reqContent.accountType = content.role;
  reqContent.pageSize = pageSize;
  reqContent.page = page;
  getServiceList(reqContent);
}

function getServiceList(reqContent) {
  $.ajax({
    type: "get",
    dataType: "jsonp",
    url:
      "http://120.92.209.30:28081/mobile/pull/webapp/servicemsg/list?" +
      objectToQueryString(reqContent),
    success: function (res) {
      console.log(res);
      $(".loading").hide();
      if (res.resultState == 1) {
        if (res.resultMsg != "无数据") {
          totalSize = res.resultState.length;
          buildList("container", res.items);
        } else {
          $(".empty p").append("暂无数据！");
          $(".empty").show();
        }
      }
    },
  });
}

function buildList(elName, dataList) {
  var htmlStr = "";
  for (let i = 0; i < dataList.length; i++) {
    var imgStr = "";
    if (dataList[i].imagePath) {
      imgStr = buildImgList(dataList[i].imagePath);
    }
    htmlStr += `
         <div class="list-box">
	         <div class="question-box">
					<div class="left-item">
						<img src="img/q.png" alt="">
					</div>
					<div class="right-item">
						<div class='text-box'>
							${dataList[i].askContent}
						</div>
							${imgStr}
						<div class="date">${dataList[i].askDateTime}</div>
					</div>
			 </div>
			 <div class="anwser-box">
				<div class="left-item">
					<img src="img/a.png" alt="">
				</div>
				<div class="right-item">
				</div>
			 </div>
		</div>`;
  }
  $("." + elName).append(htmlStr);
}

function buildImgList(imgList) {
  var imgArray = JSON.parse(imgList);
  var imgStr = '<div class="img-box">';
  for (let i = 0; i < imgArray.length; i++) {
    imgStr += `<img src="${imgArray[i]}" class='img'>`;
  }
  imgStr += "</div>";
  return imgStr;
}
