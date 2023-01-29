const express = require('express')
//express i include ettik
const socket = require('socket.io')
//socket i include ettik
// express, socket ismini yazınca ilgili kütüphaneyi çağır dedik
/*mesela 
const cay = rewuire ('express')
seyeydik cay yazdığımızda bu kütüphaneyi o ilgili yere çağır ve işleme tabi tut dedik 
yani cay isimli değişkene kütüphane fonksiyonlarını tayin etmiş olduk*/
const app = express()
const server = app.listen(3000)
/*3000 portuna bir server kuyrulumu yaptık
bureada yapacağımız eylemleri tepki ve sonuçlarını (localhost:3000)
yani 3000 portunda görüntüleyebileceğiz*/
app.use(express.static('public'))
/*public klasöründeki dosyalar statik yani front-end tarafının komutları yer alacak
sayfanın tasarımsalk kısımlarını public içine yazacağım bunlar statik oluyor
backend darafı ise dinamik taraf oluyor */


const io = socket(server)
io.on('connection', (socket) => { 

    console.log(socket.id)
/*
burada bağlantıyı kurarak çalışıp çalışmadığını test ettim
8080 portuna bağlanabildim mi bir sorun var mı diye kontrol ettim
*/
    //bağlantı (kurulduktan sonra alttaki işlemleri yapmaya başlayacak
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
        //veri socket dan geldi
    }) 
    socket.on('typing', data => {
        socket.broadcast.emit('typing',data)
        //gelen bu yazıyor bilgisini tüm browser larda göster
    })
       //burada da chat.js taraındaki typing eylemine arkaplanda tepki durumunu yazıyoruz
})



