const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x); //字符串变对象
const hashMap = xObject || [];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容 ， /.*意思是以/开头的后面的所以东西都有匹配到
};
const rander = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
              <div class="site">
                <div class="logo">
                ${node.logo}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                <svg class="icon" >
                <use xlink:href="#icon-close"></use>
             </svg>
             </div>
              </div>
              
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();//阻止冒泡
      hashMap.splice(index, 1)
      rander()
    });
  });
};
rander();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url
  });
  rander();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap); //JSON.stringify把对象变成字符串
  localStorage.setItem("x", string); //在本地的存储里设置x，x里的值就是string
};
