//     name : Brilian PMW
//     twitter : @brilianPMW
//     ig : @brilianpmw

const datasepatu = [

    {
        "id": 1,
        "nama_sepatu": "Nike Air Max Force Nx",
        "harga": 2000000,
        "gambar": "./assets/img/2.jpg"
    },
    {
        "id": 2,
        "nama_sepatu": "Nike separator running",
        "harga": 1200000,
        "gambar": "./assets/img/3.jpg"
    },
    {
        "id": 3,
        "nama_sepatu": "Nike air zoon mariah",
        "harga": 600000,
        "gambar": "./assets/img/4.jpg"
    },
    {
        "id": 4,
        "nama_sepatu": "LV Haipbis Shoes",
        "harga": 20000000,
        "gambar": "./assets/img/5.jpg"
    }
]



data_set = 0
no_troli = 0
isi = localStorage.getItem('troli')
const cek = (params) => {

    if (params === '{}') {
        localStorage.removeItem('troli')
    }
}
cek(isi)

if (isi) {

    data = JSON.parse(isi)
    keys = Object.keys(data)

    keys.map((num) => {
        data = parseInt(num)
    })
    no_troli = data
    $('#jml-troli').replaceWith('<span id="jml-troli">' + keys.length + '</span>')
} else {
    $('#jml-troli').replaceWith('<span id="jml-troli">' + 0 + '</span>')
    no_troli = 0;

}

function cektroli() {
    isi = localStorage.getItem('troli')
    if (isi) {

        data = JSON.parse(isi)
        keys = Object.keys(data)

        keys.map((num) => {
            data = parseInt(num)
        })
        no_troli = data
        $('#jml-troli').replaceWith('<span id="jml-troli">' + keys.length + '</span>')
    } else {
        $('#jml-troli').replaceWith('<span id="jml-troli">' + 0 + '</span>')
        no_troli = 0;

    }

}
function caridata(key, dataset) {
    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i].id === key) {
            return dataset[i];
        }
    }
}

datasepatu.map((shoe) => {
    $('#datasepatu').append('<div class="col-12 col-md-3 col-xl-3"><div class="card animated fadeInUp "><img src="' + shoe.gambar + '" class="card-img-top"><div class="card-body"><p class="card-text text-center">' + shoe.nama_sepatu + '</p><p class="text-center">' + formatRupiah(shoe.harga.toString(), 'Rp') + '</p><div class="col text-center"><button onclick="addtrolli(' + shoe.id + ')" class="btn-cart ">Add To Cart</button></div></div></div></div>')
})

const addtrolli = (id) => {
    datas = localStorage.getItem('troli')
    cek(datas)
    item = JSON.parse(datas)
    if (item) {

        no_troli += 1
        data = caridata(id, datasepatu)
        data.qty = 1
        item[`${no_troli}`] = data
        localStorage.setItem('troli', JSON.stringify(item))
        Swal.fire(
            'Succes!',
            'You Amazing Shoes in your cart Now ',
            'success'
        )
        data = JSON.parse(localStorage.getItem('troli'))
        tt = Object.keys(data)
        $('#jml-troli').replaceWith('<span id="jml-troli">' + tt.length + '</span>')




    } else {

        data = caridata(id, datasepatu)
        no_troli = 0
        data.qty = 1
        item = {
            "0": data
        }
        Swal.fire(
            'Succes!',
            'You Amazing Shoes in your cart Now ',
            'success'
        )

        localStorage.setItem('troli', JSON.stringify(item))
        $('#jml-troli').replaceWith('<span id="jml-troli">' + 1 + '</span>')



    }


}

const total_harga = () => {
    isi = localStorage.getItem('troli')
    cek(isi)

    if (isi) {

        data = JSON.parse(isi)
        keys = Object.keys(data)
        let arr = []

        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i];
            arr[key] = data[key];
        }
        // console.log(arr)
        // let fixdata = [];
        // arr.forEach(function (a) {
        //     if (!this[a.id]) {
        //         this[a.id] = { harga: a.harga };
        //         fixdata.push(this[a.id]);
        //     }
        // }, Object.create(null))
        // const sum = fixdata.reduce((a, { harga }) => a + harga, 0);

        var result = [arr.reduce((acc, n) => {
            for (var prop in n) {
                if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
                else acc[prop] = n[prop];
            }
            return acc;
        }, {})]
        // console.log(result[0].harga)
        sum = formatRupiah((result[0].harga).toString(), 'rp')



        return sum
    } else {
        return 0
    }



}


const showtrolli = () => {
    data = localStorage.getItem('troli')
    // console.log(data)
    if (data) {


        data = JSON.parse(data)
        keys = Object.keys(data)
        let arr = []

        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i];
            arr[key] = data[key];
        }
        let fixdata = [];
        arr.forEach(function (a) {
            if (!this[a.id]) {
                this[a.id] = { id: a.id, nama_sepatu: a.nama_sepatu, harga: a.harga, gambar: a.gambar, qty: 0 };
                fixdata.push(this[a.id]);
            }
            this[a.id].qty += a.qty;
        }, Object.create(null));

        fixdata.map(data => {
            $('#datatroli').append(`  <div class="col-12">
                <div class="row">
                    <div class="col-3">
                        <img src="${data.gambar}" class="card-icon">
                    </div>
                    <div class="col-6">
                        <p class="card-text">${data.nama_sepatu}</p>
                        <p class="harga">${formatRupiah(data.harga.toString(), 'Rp')} | <small class="mr-3"> ${data.qty} qty</small></p>
                        <p class="total">${formatRupiah((data.harga * data.qty).toString(), 'Rp')}</p>

                    </div>
                    <div class="col-3">
                        <button onclick="ondelete(${data.id})"
                            style="background-color: transparent;border-color: transparent;">
                            <span class="icon-hapus">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </button>
                    </div>

                </div>
            </div> 
            `)
        })
        $('#datatroli').append(`
                    <div class="col-12">
                        <div id="total_harga">
                            <p class="text-right total mt-5"> Total :${total_harga()
            } </p>
                        </div>
                    </div>
            `)
        $('.kosong').replaceWith(`
        <div id="kosong" class="row">
        </div>
        `)


    } else {
        $('#datatroli').replaceWith(`<div id="datatroli" class="row">
    </div`)

        $('#kosong').replaceWith(`
        <div class="row kosong">
  
        <div class="col-12">
          <p class="text-center">you dont have shoe in your cart :(</p>
        </div>
        </div>
    `)
        closedata()
    }




}


const ondelete = (id) => {
    isi = localStorage.getItem('troli')

    if (isi) {
        data = JSON.parse(isi)
        keys = Object.keys(data)

        Swal.fire({
            title: 'Are you sure?',
            text: "you will delete your shoes from cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#07023B',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                let arr = []

                for (let i = 0, n = keys.length; i < n; i++) {
                    let key = keys[i];
                    arr[key] = data[key];
                } myArray = arr.filter(function (obj) {
                    return obj.id !== id;
                });
                newObj = {}
                for (i = 0; i < myArray.length; i++) {
                    datanew = myArray[i]
                    newObj = { ...myArray, ...newObj }
                }
                localStorage.setItem('troli', JSON.stringify(newObj))
                closedata()
                showtrolli()
                cektroli()
                ondelete(id)

                Swal.fire(
                    'Deleted!',
                    'Your shoes has been deleted.',
                    'success'
                )

            }
        }).catch((e) => {
            Swal.fire(
                'failed!',
                'dont delete so much you will be lost your shoe :(',
                'warning'
            )
            closedata()
            $('#exampleModalCenter').modal('hide');
        })
    } else {
        Swal.fire(
            'no!',
            'your cart is empty :(',
            'warning'
        )
    }



}
function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

const closedata = () => {
    isi = localStorage.getItem('troli')
    cek(isi)



    $('#datatroli').replaceWith(` <div id="datatroli" class="row"></div>
        `)

    data_set = 0
}
