var nav=(node)=>{
    var navContent = $(`
        <div>
            <h2>欢迎光临</h2>
        </div>
    `);
    var temSpan = $("<span>").html(sessionStorage.getItem("username"));
    temSpan.css("width","80px")
    navContent.append(temSpan)
    var btn = $("<button>退出</button>");
    btn.click(function(){
        $.post("/users/quit").then((res)=>{
            if(res.data.logout){
                alert('谢谢使用');
                location.href="/login.html";
            }
        })
    })
    navContent.append(btn)
    node.html(navContent);
}