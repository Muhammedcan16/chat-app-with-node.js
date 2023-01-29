const socket= io.connect('http://localhost:3000')
/*
browser ile connection işlemini tamamlamış olduk
bu sayfayı server ımıza bağladık
*/
const server = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

/*php de post methoduna gelen verileri bağlayıp tutarak 
istendiği zaman bu verileri çekip işlem yapabiliyorduk
bu işlemin javascript deki hali bu şekilde
yani input a girilen verileri serverda tutacak 
arkaplanda node.js ile yazdığımız eylemleri yapacak ve sayfaya sonucu döndürecek*/

submitBtn.addEventListener('click', () => {
/*click işlemini yöneteceğiz 
bilgileri servera yollamasını sağlayacağız 
önce verilerin gnderilme işlemini yapacağız */
  socket.emit('chat',{
    message: message.value,
    sender: sender.value
}) 
})
//socket dan gelen veriyi işlememiz gerekiyor
socket.on('chat', data => {
 feedback.innerHTML = ''//chat e yazıyor düşünce yazma eylemi bitince temizlesin
 output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>'
 //şuanda uygulamamız hazır bir de kullanıcı ismini yazdıktan sonra mesajını yazarken örnek olarak
 //kullanıcı1 yazıyor... şeklinde chat kısmında yazsın diye
 message.value = '';
 //içini boşalttık

})
message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
    //klavyeden bir tuşa basıldığında
    //kullanıcı1 yazıyor typing yazacak
})
socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + 'yaziyor...</p>'
})


