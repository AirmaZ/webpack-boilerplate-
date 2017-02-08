import {languageString} from "../../language/language"
import {utilTools, commonAjax} from "./utilTools"

class Tables {
    constructor(id, url, {options, otherOptions}){
        this.initFlag = $.fn.DataTable.isDataTable(`#${id}`);
        this.$dom = $(`#${id}`);
        this.id = id;
        this.url = url;
        this.otherOptions = $.extend(this._getOtherOptions(), otherOptions);
        this.options = $.extend(this._getOptions(), options);
		this.options.columns = this._getColumns(id);
    }

    // 私有方法
    _getOptions = (id)=>{
        return {
            processing: true, // 加载中。。。
			serverSide: true, // 指定从服务器端获取数据
			pagingType: "full_numbers", // 分页模式
			responsive: true, // 自适应
			autoWidth: true, 
			deferRender: true,
			lengthMenu: [ 10, 15, 25, 50, 75, 100 ], 
			pageLength: 10,
			language: languageString("{language.dataTable}",true),
			dom: '<"top"f>rt<"bottom"lp><"clear">',
            searching: true,
			createdRow: (row, data, index)=> {
			},
	        headerCallback: (row)=>{
	        	// 解决表格列不居中问题
	        	$('th', row).removeClass('text-left').addClass('text-center');
	        },
            ajax: (data, callback, settings) => {
				// 初始化不加载数据逻辑处理
				if(this.otherOptions.firstNotLoad && !this.initFlag){
					callback({
						draw: data.draw,
						recordsTotal: 0,
						recordsFiltered: 0,
						data: []
					});
					return;
				}
				// 请求参数
				let pageParams = this.getPageParams(data);
                let searchParams = this.getSearchParams(data.columns, data.search.value);
                let params = $.extend(pageParams, searchParams);
				commonAjax(url, 'post', params, false, (data)=>{
					let returnData = this.dataFormatter(data);
					callback(returnData);
				});
			},
			// 渲染完毕后的回调
            drawCallback: (settings) => {
                setTimeout(()=> {
					this._setWrap();
					$(window).resize();
					// 设置搜索框placeholder
					this._setSearchText();
					// 复选框点击事件
					this.$wrap.on("change",":checkbox", (event)=>{
						if ($(event.currentTarget).is("[name='cb-check-all']")) {
							//全选
							$(":checkbox:not(:hidden)", this.$dom).prop("checked", $(event.currentTarget).prop("checked"));
						}else{
							//一般复选
							var checkbox = $("tbody :checkbox:not(:hidden)", this.$dom);
							$(":checkbox[name='cb-check-all']", this.$wrap).prop('checked', checkbox.length == checkbox.filter(':checked').length);
						}
					}).on("click",".td-checkbox", (event)=> {
						//点击单元格即点击复选框
						!$(event.currentTarget).is(":checkbox") && $(":checkbox", this).trigger("click");
					});
					// 行点击事件
					$("tbody", this.$dom).on("click", "tr", (event)=>{
						if(this.otherOptions.selectable){
							$(event.currentTarget).addClass("active").siblings().removeClass("active");
						}
					});
					// 解决滚动条丑陋问题
					
				}, 100);
			}
        }
    }

    _getOtherOptions = ()=>{
        return {
            firstNotLoad: false, // 初始化不加载数据
            operateDisable: {}, // 操作列操作按钮禁用标志
            columns:{},  // 列自定义
            selectable: false   // 选中行高亮设置
        }
    }

    _getColumns = (id)=>{
        var columns = [];
		let $ths = this.$dom.find('th');

		$.each($ths, (i, item) => {
			let dataId = $(item).attr('data-id');
			let render, orderable, searchable, visible, customCol, tempCol;
			// 获取用户自定义列配置
			customCol = this.otherOptions.columns[dataId];
			if(customCol){
				render = customCol.render || this._render;
				orderable = customCol.orderable || false;
				searchable = customCol.searchable || !this.options.serverSide;
				visible = customCol.visible || true;
			}else{
				searchable = !this.options.serverSide;
			}
			let width = $(item).attr('data-width');
			let align = $(item).attr('data-align') ? `text-${align}` : 'text-center';
			// 复选框
			if(item.hasAttribute('checkbox')){
				tempCol = {
	                className: "td-checkbox",
	                orderable: false,
					searchable: false,
	                width: "30px",
	                data: null,
	                render: (data, type, row, meta)=> {
	                    return '<input type="checkbox" class="td-check">';
	                }
				}
			}
			// 操作列处理
			else if($(item).attr('td-opt') === ''){
				let btns = $(item).attr('btns').split(',');
				tempCol = this._getOptionColumn(btns, width);
			}
			// 普通列
			else{
				tempCol = {
					orderable: orderable || false,
					searchable: searchable || false,
					visible: visible || true,
					className: `ellipsis ${align}`,
					render: render || this._render,
					data: $(item).attr('data-id'),
					width: width
				}
			}
			columns.push(tempCol);
		});
		return columns;
    }

    _getOptionColumn = (btns, width)=>{
	    return {
			className : "td-operation text-center",
			orderable: false,
			searchable: false,
        	data: null,
        	width: width,
        	render: (data, type, row, meta) => {
        		let html = '';
        		$.each(btns, (i, item) => {
        			let id = item;
					// 禁用检查
					let disableFunc = this.otherOptions.operateDisable[item];
					let disable = '';
					if(disableFunc){
						// 设置禁用样式
						disable = this.otherOptions.operateDisable[item](data) ? 'opt-disable' : '';
					}
        			html += `<span id="${id}" class="opt-icon fa fa-${item} ${disable}"></span>`;
        		});
		        return html;
			}
		}
	}

    _render = (data, type, row, meta) => {
		data = data || "";
		return `<span title="${data}">${data}</span>`;
	}

	_setWrap = ()=>{
		let $wrap = this.$dom.parents('.dataTables_wrapper');
		if(this.options.sScrollY || this.options.sScrollX){
			$wrap.find('.dataTables_scrollBody thead :checkbox').remove();
		}
		this.$wrap = $wrap;
	}

	_setSearchText = ()=>{
		let searchableCols = [];
		let cols = this.options.columns;
		let text;
		// 获取可搜索列
		for (let i = 0; i < cols.length; i++) {	
			if(cols[i].searchable){
				searchableCols.push(languageString(`{language.${cols[i].data}}`));
			}
		}
		text = searchableCols.join('或');
		this.$wrap.find('input[type=search]').attr('placeholder', `请输入${text}`);
	}

    // 创建
    create = ()=>{
		// 初始化表格
		this.table = this.$dom.dataTable(this.options);
		this._table = this.table.api();
		// 设置初始化标志
		this.initFlag = true;
    }

    // 添加按钮
	appendButtons = (id, btns)=>{
		$.each(btns, (i, item)=>{
			let $wrap = $('<span class="fr btn-wrap"></span>');
			let $tempHtml = $(`<button id="${item.id}"><font class="${item.icon}"></font>${item.text}</button>`);
			$wrap.append($tempHtml);
			let items = item.item;
			if (items && items.length) {
				let $ul = $('<ul class="hidden"></ul>');
				$.each(items, (i, item)=>{
					let $li = $(`<li id="${item.id}">${item.text}</li>`);
					$ul.append($li);
				});
				$wrap.append($ul);
			};
			$(`#${id}_wrapper #${id}_filter`).append($wrap);
		});
		// 下拉按钮绑定事件
		$(`#${id}_filter .btn-wrap`).hover((event)=>{
			$(event.currentTarget).find('ul').show();
		}, (event)=>{
			$(event.currentTarget).find('ul').hide();
		});
	} 

	// 数据格式化
	dataFormatter = (data)=>{
		//封装返回数据
		let returnData = {};
		returnData.draw = data.draw;
		returnData.recordsTotal = data.dataTotal;
		returnData.recordsFiltered = data.recordsFiltered || data.dataTotal; // 后台不实现过滤功能，每次查询均视作全部结果
		returnData.data = data.list;
		return returnData;
	}

	// 获取搜索参数
	getSearchParams = (cols, searchInfo)=>{
		let result = {};
		for (let i = 0; i < cols.length; i++) {
			if(cols[i].searchable){
				result[cols[i].data] = searchInfo;
			}
		}
		return result;
	}

	// 获取分页参数
	getPageParams = (data)=>{
		// 封装请求参数
		let params = {};
		params.pageSize = data.length; //页面显示记录条数，在页面显示每页显示多少项的时候
		params.currentPage = (data.start / data.length) + 1; //当前页码
		params.draw = data.draw;
		 // 排序信息
        let orderCol = data.order[0];
        if(orderCol){
            params.orderColumn = data.columns[orderCol.column].data;
            params.orderDir = orderCol.dir;
        }
		return params;
	}
}

export default Tables