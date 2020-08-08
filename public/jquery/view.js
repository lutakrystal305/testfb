$(document).ready(function(){
  	$("#plus1").click(function(){
    	$(".edit-cover").css("display", "block");
    	$("#plus").css("display", "none");
  });
   	$("#btn1").click(function(){
    	$("#plus1").css("display", "block");
    	$(".edit-cover").css("display", "none");
  });
    $("#plus2").click(function(){
      $(".edit-avatar").css("display", "block");
      $("#plus2").css("display", "none");
  });
    $("#btnA").click(function(){
      $("#plus2").css("display", "block");
      $(".edit-avatar").css("display", "none");
  });
   	$("#edit1").click(function(){
    	$(".x1").css("display", "flex");
    	$("#cc").css("display", "none");
  });
   	$("#edit2").click(function(){
    	$(".x2").css("display", "flex");
    	$("#vv").css("display", "none");
  });
   	$("#btn2").click(function(){
    	$("#cc").css("display", "block");
    	$(".x1").css("display", "none");
  });
   	$("#btn3").click(function(){
    	$("#vv").css("display", "block");
    	$(".x2").css("display", "none");
  });
    $(".fa-edit").click(function(){
    	$("#quote-edit").css("display", "flex");
    	$("#quote-init").css("display", "none");
  });
    $("#btn-change").click(function(){
    	$("#quote-init").css("display", "flex");
    	$("#quote-edit").css("display", "none");
  });
 });
