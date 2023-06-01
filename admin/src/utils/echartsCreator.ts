import * as echarts from "echarts";
import { getRandomColor } from "./getRandom";

export function createCurve(
  dom: HTMLElement,
  xAxisType: string,
  titles: any[],
  values: any[],
  seriesType: string,
  title: string
) {
  var myChart = echarts.init(dom);

  let config = {
    title: {
      text: title,
      left: "center",
    },

    legend: {
      show: false,
      orient: "vertical",
      bottom: "bottom",
      data: titles,
    },

    xAxis: {},

    // legend: {
    //   name: values,
    // },

    tooltip: {},
    yAxis: {},
  } as any;

  if (seriesType === "line") {
    config.xAxis = {
      show: true,
      type: xAxisType,
      data: titles,
      axisLabel: {
        interval: 0,
        // margin: 100,
      },
    };

    config.yAxis = {
      type: "value",
    };

    config.series = [
      {
        data: values,
        type: seriesType,
        tip: true,
      },
    ];
  } else if (seriesType === "pie") {
    delete config.xAxis;
    delete config.yAxis;
    const value = titles.map((ele: string, index: number) => ({
      name: ele,
      value: values[index],
    }));
    config.series = [
      {
        data: value,
        type: seriesType,
        tip: true,
      },
    ];
  } else if (seriesType === "bar") {
    config.xAxis = {
      show: true,
      type: xAxisType,
      data: titles,
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    };

    config.yAxis = {
      type: "value",
    };

    const value = values.map((ele: string, index: number) => ({
      name: titles[index],
      value: ele,
      itemStyle: {
        color: getRandomColor(),
      },
    }));
    config.series = [
      {
        data: value,
        type: seriesType,
        tip: true,
      },
    ];
  }

  myChart.setOption(config);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
}
