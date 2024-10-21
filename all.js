    $(function () {
        sc_num();
        sc_msg();

        $.ajax({
          url: "good.json",

          success: function (arr) {
            alert("歡迎光臨!");
            for (var i = 0; i < arr.length; i++) {
              var node = $(`<li class = 'goods_item'>
                                <div class = 'goods_pic'>
                                    <img src="${arr[i].img}" alt=""/>
                                </div>
                                <div class = 'goods_title'>
                                    <p>專題超市</p>
                                </div>
                                <div class = 'sc'>
                                    <div id = '${arr[i].id}'class = "sc_btn">加入購物車</div>
                                </div>
                            </li>`);
              node.appendTo(".goods_box ul");
            }
          },
          error: function (msg) {
            console.log(msg);
          },
        });

        $(".goods_box ul").on("click", ".sc_btn", function () {
          var id = this.id;

          var first = $.cookie("goods") == null ? true : false;

          if (first) {
            var arr = [{ id: id, num: 1 }];
            $.cookie("goods", JSON.stringify(arr), {
              expires: 7,
            });
          } else {
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            var same = false;
            for (var i = 0; i < cookieArr.length; i++) {
              if (id == cookieArr[i].id) {
                same = true;
                cookieArr[i].num++;
                break;
              }
            }
            if (!same) {
              cookieArr.push({ id: id, num: 1 });
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
              expiress: 7,
            });
          }
          sc_num();
          sc_msg();
          alert("新增成功");
        });

        function sc_msg() {
          $(".sc_right ul").empty();

          $.ajax({
            url: "123.json",
            success: function (arr) {
              var cookieStr = $.cookie("goods");
              var newArr = [];
              if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < arr.length; i++) {
                  for (var j = 0; j < cookieArr.length; j++) {
                    if (arr[i].id == cookieArr[j].id) {
                      arr[i].num = cookieArr[j].num;
                      newArr.push(arr[i]);
                    }
                  }
                }
                for (var i = 0; i < newArr.length; i++) {
                  var node = $(`<li>
                                    <div class = 'sc_goodsPic'>
                                        <img src = "${numArr[i].img}" alt=""/>
                                    </div>
                                    <div class = 'sc_goodsTitle'>
                                        <p>商品<p>
                                    </div>
                                    <div class = 'sc_goodsBtn'>購買</div>
                                    <div class = 'sc_goodsNum'>商品數量:${newArr[i].num}</div>
                                </li>`);
                  node.appendTo($(".sc_right ul"));
                }
              }
            },
          });
        }

        function sc_msg(){

          $(".sc_right ul").empty();
          
          $.ajax({
            url:"123.json",
            success:function(arr){
              var cookieStr = $.cookie("goods");
              var newArr = [];
              if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0;i<arr.length;i++){
                  for(var j= 0; j<cookieArr.length;j++){
                    if(arr[i].id== cookieArr[j].id){
                      arr[i].num = cookieArr[j].num;
                      newArr.push(arr[i]);
                    }
                  }
                }
                for(var i = 0; i<newArr.length;i++){
                  var node = $(`<li id = '${newArr[i].id}'>
                      <div class = 'sc_goodsPic'>
                        <img src="${newArr[i].img}" alt=""/>
                      </div>
                      <div class = 'sc_goodsTitle'>
                        <p>這是商品</p>
                      </div>
                      <div class = 'sc_goodsBtn'>購買</div>
                      <div class = 'sc_goodsDeleteBtn'>刪除</div>
                      <div class = 'sc_goodsNum'>商品數量:${newArr[i].num}</div>
                      <button>+</button>
                      <button>-</button>
                    </li>`);
                    node.appendTo($(".sc_right ul"));
                }
              }
            }
          })
        }
        $(".sc_right").mouseenter(function () {
          $(this).stop(true).animate(
            {
              right: 0,
            },
            500
          );
        });
        $(".sc_right").mouseleave(function () {
          $(this).stop(true).animate(
            {
              right: -270,
            },
            500
          );
        });

        function sc_num() {
          var cookieStr = $.cookie("goods");
          if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
              sum += cookieArr[i].num;
            }
            $(".sc_right .sc_num").html(sum);
          } else {
            $(".sc_right .sc_num").html(0);
          }
        }
        $("#removeSc").click(function(){
          $.cookie("goods",null);
          sc_num();
          sc_msg();
        })
        // 加入右邊刪除鍵的點擊事件
        $(".sc_right ul").on("click",".sc_goodsDeleteBtn", function(){

          var id = $(this).closest("li").remove().attr("id");
          var cookieStr = $.cookie("goods");
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0 ; i < cookieArr.length;i++){
            if(cookieArr[i].id == id){
              cookieArr.splice(i,1);
              break;
            }
          }
            // 更新購物車
            $.cookie("goods",JSON.stringify(cookieArr),{
              expires:7
            })
          sc_num();
          alert("刪除成功");
        })
        // 新增+ -按鈕  
        $(".sc_right ul").on("click","button",function(){
          var id = $(this).closest("li").attr("id");
          
          var cookieStr = $.cookie("goods");
          var cookieArr = JSON.parse(cookieStr);
          for(var i = 0; i<cookieArr.length;i++){
            if(id== cookieArr[i].id){

              if(this.innerHTML == "+"){
                cookieArr[i].num++;
              }else{
                if(cookieArr[i].num==1){
                  alert("商品數量已為1，不能再減了");
                }else{
                  cookieArr[i].num--;
                }
              }
              $(this).prevAll(".sc_goodsNum").html("商品數量:"+ cookieArr[i].num);
              $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
              })
              break;
            }
          }
          sc_num();
        })
      });
