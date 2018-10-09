/**
 * WordCamp Tokyo 2015 景品スロット
 *
 * @version    0.1.0-beta
 * @author     Keisuke Imura <keisuke@keisuke-imura.com>
 * @license    The MIT License
 * @link       http://funteractive.jp/
 */

$(function() {
	var slot = { 
		init: function() {
			/*
			 * 設定ここから（いじっていいですよ！）
			 */

			//景品の個数
			//この数によってスロットで出る確率が変わります。
			//残りの数によって調整して下さい。
			this.keihin = {
				tshirt : 1,	//Tシャツ 15
				stecker: 1,	//ステッカー 550
				cup: 1,	//マグカップ 20
                mufflertowel: 1,	//マフラータオル 20
                dorayaki: 1,	//どら焼き 50
                bag: 1,	//バッグ
                choco: 1,	//カスタムチョコレート 50
                badge: 1	//缶バッジ 50
			}

			//スピード（単位：ms）
			this.speed = 50;

			/*
			 * 設定ここまで（ここから下はいじらないで！）
			 */


			//景品掲載エリア
			this.slot = $('#slot');
			this.preItem = '';

			//景品総数の計算
			var that = this;
			this.sum = 0;
			$.each(that.keihin, function(index, value) {
				that.sum = that.sum + value;
			});

			var arr = [];
			for(var i = 0; i < this.sum; i++ ) {
				if(i < that.keihin.stecker) {
					arr[i] = 'stecker';
				} else if(i < (that.keihin.stecker + that.keihin.tshirt)) {
					arr[i] = 'tshirt';
				} else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco)) {
					arr[i] = 'choco';
				} else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco + that.keihin.cup)) {
					arr[i] = 'cup';
				} else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco + that.keihin.cup + that.keihin.mufflertowel)) {
                    arr[i] = 'mufflertowel';
                } else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco + that.keihin.cup + that.keihin.mufflertowel + that.keihin.dorayaki)) {
                    arr[i] = 'dorayaki';
                }  else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco + that.keihin.cup + that.keihin.mufflertowel + that.keihin.dorayaki + that.keihin.badge)) {
                    arr[i] = 'badge';
                }  else if(i < (that.keihin.stecker + that.keihin.tshirt + that.keihin.choco + that.keihin.cup + that.keihin.mufflertowel + that.keihin.dorayaki + that.keihin.badge + that.keihin.bag)) {
                    arr[i] = 'bag';
                }
			}
			this.arr = arr;

			//ボタンを押した時の挙動
			this.button = $('#button').find('a');

			$('#button').find('a').on('click', function() {
				//スタートボタンでスロット開始＆ボタンをストップボタンに変更
				if($('#button').hasClass('start')) {
					that.slot.find('img').remove();
					that.start();
					$('#button').removeClass('start').addClass('stop');
					return false;
				}
				//ストップボタン押すとストップして景品の名前を出す
				else if($('#button').hasClass('stop')) {
					if(that.moveTimer) {
						clearTimeout(that.moveTimer);
						$('#button').remove();
						var stop = that.slot.attr('class');
						switch(stop){
							case 'tshirt':
								var text = 'Tシャツ';
								break;
                            case 'stecker':
								var text = 'ステッカー';
								break;
							case 'choco':
								var text = 'カスタムチョコレート';
								break;
							case 'cup':
								var text = 'マグカップ';
								break;
                            case 'mufflertowel':
                                var text = 'マフラータオル';
                                break;
                            case 'dorayaki':
                                var text = 'どら焼き';
                                break;
                            case 'badge':
                                var text = '缶バッジ';
                                break;
                            case 'bag':
                                var text = 'トートバッグ';
                                break;
						}
						$('#result').text(text).fadeIn(300);
					}
					return false;
				}
			});

		},

		start: function() {

			//3種類の画像を個数ごとの割合でランダム表示
			var rand;
			var rand = this.mt_rand();
			if( this.preItem ){
				while( this.preItem == this.arr[rand] ){
					var rand = this.mt_rand();
				}
			} else {
				var rand = this.mt_rand();
			}
			this.preItem = this.arr[rand];
			var item = this.arr[rand];

			//景品に応じたclassをつける。画像は背景画像として表示
			this.slot.removeClass().addClass(item);

			var that = this;
			this.moveTimer = setTimeout(function() { that.start() }, that.speed );
		},

		mt_rand: function(){
			return parseInt(Math.random() * (this.sum - 1));
		}
	}

	slot.init();
});
