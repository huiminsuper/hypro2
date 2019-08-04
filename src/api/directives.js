import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
		console.log('el: ', el);
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
			console.log('e.clientX: ', e.clientX);
			console.log('dialogHeaderEl.offsetLeft: ', dialogHeaderEl.offsetLeft);
			
			
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            console.log('disX: ', disX);
            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
			console.log('dialogHeaderEl.offsetWidth: ', dialogHeaderEl.offsetWidth);
			console.log('document.documentElement.clientWidth: ', document.documentElement.clientWidth);
			console.log('document.body.clientWidth: ', document.body.clientWidth);
			
            /* const MX=(document.documentElement.clientWidth || document.body.clientWidth)-dialogHeaderEl.offsetWidth;
            const MY=(document.documentElement.clientHeight || document.body.clientHeight)-dialogHeaderEl.offsetHeight; */
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
				console.log('e.clientX: ', e.clientX);
				console.log('disX: ', disX);
                let l = e.clientX - disX;
                let t = e.clientY - disY;

				/* if(l<0){
				    l=0;
				}else if(l>MX){
				    l=MX;
				}
				if(t<0){
				    t=0;
				}else if(t>MY){
				    t=MY;
				} */

                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog');

        el.onmousedown = (e) => {
            
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft;
            
            document.onmousemove = function (e) {
                e.preventDefault(); // 移动时禁用默认事件

                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                dragDom.style.width = `${l}px`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})