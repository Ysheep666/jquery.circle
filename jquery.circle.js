/**
 * 一个实现圆形进度条的插件
 */

+function ($) { "use strict";
  var Circle = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Circle.DEFAULTS, options);
    this.init();
  };

  Circle.DEFAULTS = {
    radius: 200, // 半径
    strokeWidth: 8, // 宽度
    template: '<svg class="circle" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle fill="transparent" stroke-dashoffset="0"></circle><circle class="circle-bar" fill="transparent" stroke-dashoffset="0"></circle></svg>'
  };

  // 初始化
  Circle.prototype.init = function () {
    var $svg = $(this.options.template)
    $svg.attr({
      'width': this.options.radius,
      'height': this.options.radius,
      'viewPort': '0 0 ' + this.options.radius/2 + ' ' + this.options.radius/2
    });
    $svg.find('circle').attr({
      'r': this.options.radius/2 - this.options.strokeWidth/2,
      'cx': this.options.radius/2,
      'cy': this.options.radius/2,
      'stroke-dasharray': 3.15 * (this.options.radius - this.options.strokeWidth)
    });
    this.$element.append($svg);
  };

  // 设置数据为一个百分值 0~100
  Circle.prototype.change = function (value) {
    var $circle = this.$element.find('.circle-bar');
    if (isNaN(value)) {
     value = 100;
    } else {
      var r = $circle.attr('r');
      var c = 3.15*(r*2);
      if (value < 0) { value = 0;}
      if (value > 100) { value = 100;}
      var pct = (value/100) * c;
      $circle.css({ strokeDashoffset: pct});
      this.$element.attr('data-pct', value);
    }
  };

  $.fn.circle = function (option, value) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      var data = $this.data('kr.circle');
      if (!data) {
        data = new Circle(this, options);
        $this.data('kr.circle', data);
      }

      if (typeof option == 'string') {
        if (isNaN(value)) {
          data[option]();
        } else {
          data[option](value);
        }
      }
    });
  };

  $.fn.circle.Constructor = Circle;
}(window.jQuery || window.Zepto);
