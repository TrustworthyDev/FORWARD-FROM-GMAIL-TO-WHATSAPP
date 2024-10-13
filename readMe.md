This is for being forward emails from Gmail to Whatsapp.


Node server have to run using ngrok.
And then you need to write code in Google Script below :

function sendEmailToServer() {
  
  var threads = GmailApp.search('is:unread');
  for(var i = 0; i < threads.length; i++){
  
    var messages = threads[i].getMessages();
    
    for(var j =0; j < messages.length; j++) 
    {
     
      var message = messages[j];
      if(message.isUnread()){
      
        var emailData = {
          subject: message.getSubject(),
          body:  message.getPlainBody()
        };

        var payload = JSON.stringify(emailData);
        var options = {
          'method': 'post',
          'contentType': 'application/json',
          'payload': payload
        }
        UrlFetchApp.fetch('https://d05e-38-75-137-97.ngrok-free.app/forward-email', options);
        message.markRead();
      }
    }
  }
}


function createTimeTrigger(){
  ScriptApp.newTrigger('sendEmail')
          .timeBased()
          .everyMinutes(5)
          .create();
}


