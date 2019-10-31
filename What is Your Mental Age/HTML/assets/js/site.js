var App = function() {

    /*===================
          GOTO TOP
    =====================*/
    var _gotoTop = function() {
      // Action
      $('body').on('click','.goto-top',function(e) {
        e.preventDefault();
         $("html, body").animate({ scrollTop: 0 }, 600);
      });
      // Check Visibility
      function checkWinToGoto(){
        if($(window).width() > 767){
          $(window).scroll(function() {
            if ( $(this).scrollTop() >= 350 ) {
              $('.goto-top').fadeIn(500);
            } else if ( $(this).scrollTop() <= 200 ) {
              $('.goto-top').fadeOut(500);
            }
          });
        }
      }

      checkWinToGoto();

      $(window).resize(function() {
        checkWinToGoto();
      });

    };

    /*======================
         CHECK LANGUAGE
    ========================*/
  	var _languageCheck = function(){
  		($('html').attr('dir') == 'ltr') ? $('body').addClass('lang-eng') : $('body').addClass('lang-arb');
  	};



    return {
        init: function(){
            _gotoTop();
        },
        afterInit: function(){
          _languageCheck();
        },
        toster: function(text) {
          function ToastBuilder(options) {
            // options are optional
            var opts = options || {};

            // setup some defaults
            opts.defaultText = opts.defaultText || 'default text';
            opts.displayTime = opts.displayTime || 3000;
            opts.target = opts.target || 'body';

            return function (text) {
              $('<div/>')
                .addClass('toast')
                .prependTo($(opts.target))
                .text(text || opts.defaultText)
                .queue(function(next) {
                  $(this).css({
                    'opacity': 1
                  });
                  var topOffset = 15;
                  $('.toast').each(function() {
                    var $this = $(this);
                    var height = $this.outerHeight();
                    var offset = 15;
                    $this.css('top', topOffset + 'px');

                    topOffset += height + offset;
                  });
                  next();
                })
                .delay(opts.displayTime)
                .queue(function(next) {
                  var $this = $(this);
                  var width = $this.outerWidth() + 20;
                  $this.css({
                    'right': '-' + width + 'px',
                    'opacity': 0
                  });
                  next();
                })
                .delay(600)
                .queue(function(next) {
                  $(this).remove();
                  next();
                });
            };
          }

          // customize it with your own options
          var myOptions = {
            defaultText: 'Toast, yo!',
            displayTime: 3000,
            target: 'body'
          };
            //position: 'top right',   // TODO: make this */
            //bgColor: 'rgba(0,0,0,0.5)', // TODO: make this */

          // to get it started, instantiate a copy of
          // ToastBuilder passing our custom options
          var showtoast = new ToastBuilder(myOptions);

          return showtoast(text);
          /*
          showtoast($('#textbox').val());

          $('body')
          .queue(function(next) {
            showtoast('Hey look, toast!');
            next();
          }).delay(100)
          .queue(function(next) {
            showtoast('Sweet!');
            next();
          })
          .delay(500);
          */
        },
    }
}();

var Game = function() {

  /*========================================
    https://www.youtube.com/watch?v=JMqUqZCb5Iw

    Points According to Question Selection

    1 - 10 Points
    2 - 20 Points
    3 - 30 Points
    4 - 40 Points

    //Conditions
    100 to 190 Points - 9 Years (Very immature)
    191 to 290 Points - 15 to 19 Years (Between Immature and Mature)
    291 to 330 Points - 22 to 30 Years (Mature)
    331 to 380 Points - 35 to 55 Years (Very Mature)
  
  ==========================================*/

  var _gamer = function(){
      var main = $('.question-area');
      var currentNumber = $('.question-current-number');
      var currentQuestion = $('.question-current');
      var answerWapper = $('.question-answers');
      var answers = undefined;
      var selectedAnswer = [];// ["4", "3", "2", "1", "4", "3", "2", "1", "4", "3"];
      var result = $('#result');

      var questions = [
                        { 
                          question:'Select you set of colors?', 
                          answer: ['quiz-1_1.png','quiz-1_2.png','quiz-1_3.png','quiz-1_4.png'], 
                          type:'img'
                        },
                        {
                          question:'Which singer do you like the most?', 
                          answer: ['Atif Aslam','Nusrat Fate Ali Khan','Don\'t like Music','Mehdi Hassan'], 
                          type:'text'
                        },
                        {
                          question:'What do you do on the internet for most of the time?',
                          answer: ['Social Media','Funny Videos','News','For Email'], 
                          type:'text'
                        },
                        {
                          question:'What Skill would you like to learn?',
                          answer: ['Foreign language','A sport','Painting','Writing'], 
                          type:'text'
                        },
                        {
                          question:'What would you like to do for Recreation?',
                          answer: ['Watch Movies','Go to Park','Read Novels or Books','Go to a Museum'], 
                          type:'text'
                        },
                        {
                          question:'What behaviour defines you better when you make a mistake?',
                          answer: ['Try to hide your mistake.','Make excuses blame others.','Admit your mistake.','Offer compensation.'], 
                          type:'text'
                        },
                        {
                          question:'How do you spend most of your time on youtube?',
                          answer: ['Films/Songs','Dramas','Motivational Videos','Documentaries'], 
                          type:'text'
                        },
                        {
                          question:'What\'s the meaning/purpose of life for you?',
                          answer: ['Money','No Thoughts','Career/Dreams','Success in End of Day'], 
                          type:'text'
                        },
                        {
                          question:'What do you think about fast food?',
                          answer: ['Can\'t live without it','Once or twice a week','Once or twice a month','It\'s too dangerous'], 
                          type:'text'
                        },
                        {
                          question:'What\'s your level of Tolerance?',
                          answer: ['Quickly get Angry','Normal Anger','Rarely Get angry','Always Calm'], 
                          type:'text'
                        }
                      ];
      
      // Init - Answers / Question / Number
      function getQuiz(QuizNum){
          for(var a=0; a<4; a++){
            var _val = a+1;
            var getTypeHTML;
            
            if(questions[QuizNum].type == 'img'){
              getTypeHTML = '<img src="assets/img/'+questions[QuizNum].answer[a]+'">';
            }
            else{
              getTypeHTML = questions[QuizNum].answer[a];
            }   
    
            answers = '<li><div class="row"><div class="col-md-2"><input name="answers" value="'+ _val +'" type="radio"></div><div class="col-md-10">'+ getTypeHTML +'</div></div></li>';
            answerWapper.append(answers);
    
          }      
          currentNumber.html(QuizNum+1); 
          currentQuestion.html(questions[QuizNum].question);
          main.attr('data-question',QuizNum+1);
          
        
      }

      // Reset Quiz
      function resetQuiz(){
        currentQuestion.html('');
        answerWapper.html('');
      }

      function getResult(){
        var endResult = 0;
        var nature;
        
        for(var q=0; q < selectedAnswer.length; q++){
          console.log(parseInt(selectedAnswer[q]));
          endResult += parseInt(selectedAnswer[q]);  
        }

        /* Conditions
          100 to 190 Points - 9 Years (Very immature)
          191 to 290 Points - 15 to 19 Years (Between Immature and Mature)
          291 to 330 Points - 22 to 30 Years (Mature)
          331 to 380 Points - 35 to 55 Years (Very Mature)
        */

        if(endResult < 190){
          nature = 'Very Immature';
        }
        else if(endResult > 190 && endResult <= 290){
          nature = 'Between Immature and Mature';
        }
        else if(endResult > 290 && endResult <= 330){
          nature = 'Mature';
        }
        else if(endResult > 330){
          nature = 'Very Mature';
        }

        $('#finalResult').html('Total Points '+ endResult +'<br> According to this result you are '+ nature);
      }
     

      // Init
      getQuiz(0);
      console.log(questions.length);
      console.log(main.attr('data-question'));
     
      $('#saveQuiz').click(function(e){
          e.preventDefault();
          var nextQuiz = parseInt(main.attr('data-question'));

          if(parseInt(main.attr('data-question')) < questions.length){
            if(answerWapper.find('input[type="radio"]:checked').length){
              result.append( '<h3>Quiz # '+ main.attr('data-question') +'</h3>' );
              result.append('<p>'+ answerWapper.find('input[type="radio"]:checked').val() +'</p>');
              selectedAnswer.push(answerWapper.find('input[type="radio"]:checked').val() + 0);
              resetQuiz();
              getQuiz(nextQuiz);
              
            }
            else{
              alert('Please, Select an answer!');
            }
          }
          else if(parseInt(main.attr('data-question')) == questions.length){ 
            // End Result will be here
            result.append( '<h3>Quiz # '+ main.attr('data-question') +'</h3>' );
            result.append('<p>'+ answerWapper.find('input[type="radio"]:checked').val() +'</p>');
            selectedAnswer.push(answerWapper.find('input[type="radio"]:checked').val() + 0);
            
            resetQuiz();
            $('#saveQuiz').hide();
            $('#resetQuiz').show();
            $('.question-area .panel-title').closest('.panel-title').html('Result');            
            $('#finalResult').show();
            getResult();

          }
      });

      $('#resetQuiz').click(function(e){
        e.preventDefault();
        selectedAnswer = [];
        $('.question-area .panel-title').html('Question <span class="question-current-number">1</span> of 10'); 
        getQuiz(0);
        result.html('');
        $('#saveQuiz').show();
        $('#resetQuiz').hide();
        $('#finalResult').hide();        
      });

      
      

      
      
      



      
      

      //document.cookie = "username=John Doe";
  }

  return {
    init: function(){
      _gamer();
    }
  }
}();

$(document).ready(function(){
    App.init();

    Game.init();

    $('#department-gallery').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:4,
        dots:false,
        autoplay: false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive :{
          768 :{
            items:4
          },
          767 : {
            items:2
          },
          640 : {
            items:2
          },
          320 : {
            items:1,
            margin:0,
          }
        }
    });

}); // end document ready

window.onload = function() {

    App.afterInit();

}; // end window.load


