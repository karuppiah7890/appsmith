// TODO: Ashit - Add jest test for all the functions
import { get } from "lodash";

import { WidgetProps } from "widgets/BaseWidget";
import { BlueprintOperationTypes } from "widgets/constants";
import IconSVG from "./icon.svg";
import Widget from "./widget";

const DEFAULT_LIST_DATA = [
  {
    id: "001",
    name: "Blue",
    img: "https://assets.appsmith.com/widgets/default.png",
  },
  {
    id: "002",
    name: "Green",
    img: "https://assets.appsmith.com/widgets/default.png",
  },
  {
    id: "003",
    name: "Red",
    img: "https://assets.appsmith.com/widgets/default.png",
  },
];

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "List V2",
  iconSVG: IconSVG,
  needsMeta: true,
  isCanvas: true,
  defaults: {
    backgroundColor: "transparent",
    itemBackgroundColor: "#FFFFFF",
    requiresFlatWidgetChildren: true,
    hasMetaWidgets: true,
    rows: 40,
    columns: 24,
    animateLoading: true,
    gridType: "vertical",
    dynamicBindingPathList: [
      {
        key: "currentViewRows",
      },
      {
        key: "selectedRow",
      },
      {
        key: "triggeredRow",
      },
      {
        key: "primaryKeys",
      },
    ],
    currentViewRows: "{{[]}}",
    selectedRow: "{{{}}}",
    triggeredRow: "{{{}}}",
    enhancements: {
      child: {
        autocomplete: (parentProps: any) => {
          return parentProps.childAutoComplete;
        },
      },
    },
    rowGap: 0,
    templateBottomRow: 16,
    listData: DEFAULT_LIST_DATA,
    pageSize: DEFAULT_LIST_DATA.length,
    widgetName: "List",
    children: [],
    primaryKeys:
      '{{List1.listData.map((currentItem, currentIndex) => currentItem["id"] )}}',
    blueprint: {
      view: [
        {
          type: "CANVAS_WIDGET",
          position: { top: 0, left: 0 },
          props: {
            containerStyle: "none",
            canExtend: false,
            detachFromLayout: true,
            dropDisabled: true,
            openParentPropertyPane: true,
            noPad: true,
            children: [],
            blueprint: {
              view: [
                {
                  type: "CONTAINER_WIDGET",
                  size: {
                    rows: 12,
                    cols: 64,
                  },
                  position: { top: 0, left: 0 },
                  props: {
                    backgroundColor: "white",
                    containerStyle: "card",
                    dragDisabled: true,
                    isDeletable: false,
                    disallowCopy: true,
                    children: [],
                    blueprint: {
                      view: [
                        {
                          type: "CANVAS_WIDGET",
                          position: { top: 0, left: 0 },
                          props: {
                            containerStyle: "none",
                            canExtend: false,
                            detachFromLayout: true,
                            children: [],
                            version: 1,
                            blueprint: {
                              view: [
                                {
                                  type: "IMAGE_WIDGET",
                                  size: {
                                    rows: 8,
                                    cols: 16,
                                  },
                                  position: { top: 0, left: 0 },
                                  props: {
                                    defaultImage:
                                      "https://assets.appsmith.com/widgets/default.png",
                                    imageShape: "RECTANGLE",
                                    maxZoomLevel: 1,
                                    image: "{{currentItem.img}}",
                                    boxShadow: "none",
                                    objectFit: "cover",
                                    dynamicBindingPathList: [
                                      {
                                        key: "image",
                                      },
                                    ],
                                    dynamicTriggerPathList: [],
                                  },
                                },
                                {
                                  type: "TEXT_WIDGET",
                                  size: {
                                    rows: 4,
                                    cols: 12,
                                  },
                                  position: {
                                    top: 0,
                                    left: 16,
                                  },
                                  props: {
                                    text: "{{currentItem.name}}",
                                    textStyle: "HEADING",
                                    textAlign: "LEFT",
                                    boxShadow: "none",
                                    dynamicBindingPathList: [
                                      {
                                        key: "text",
                                      },
                                    ],
                                    dynamicTriggerPathList: [],
                                  },
                                },
                                {
                                  type: "TEXT_WIDGET",
                                  size: {
                                    rows: 4,
                                    cols: 8,
                                  },
                                  position: {
                                    top: 4,
                                    left: 16,
                                  },
                                  props: {
                                    text: "{{currentItem.id}}",
                                    textStyle: "BODY",
                                    textAlign: "LEFT",
                                    boxShadow: "none",
                                    dynamicBindingPathList: [
                                      {
                                        key: "text",
                                      },
                                    ],
                                    dynamicTriggerPathList: [],
                                  },
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      ],
      operations: [
        {
          type: BlueprintOperationTypes.MODIFY_PROPS,
          fn: (widget: WidgetProps & { children?: WidgetProps[] }) => {
            // List > Canvas > Container > Canvas > Widgets
            const mainCanvas = get(widget, "children.0");
            const containerId = get(widget, "children.0.children.0");
            const { widgetName } = widget;
            const primaryKeys = `{{${widgetName}.listData.map((currentItem, currentIndex) => currentItem["id"] )}}`;

            return [
              {
                widgetId: widget.widgetId,
                propertyName: "mainContainerId",
                propertyValue: containerId,
              },
              {
                widgetId: widget.widgetId,
                propertyName: "mainCanvasId",
                propertyValue: mainCanvas.widgetId,
              },
              {
                widgetId: widget.widgetId,
                propertyName: "primaryKeys",
                propertyValue: primaryKeys,
              },
            ];
          },
        },
      ],
    },
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    styleConfig: Widget.getPropertyPaneStyleConfig(),
  },
};

export default Widget;
