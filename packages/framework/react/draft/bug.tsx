import React, { useState, useMemo, useEffect, useRef } from "react";
import { Tree, Spin } from "antd";

import RenderMenuItem from "./RenderMenuItem";

import { searchTreeData } from "../../utils/data";
import {
  ManagementTypes,
  LayerTypes,
  BusinessTypes,
} from "../../constants/management";

import "./index.scss";

/**
 * 层数据
 * @param {*} props
 * @returns
 */
const TreeGraph = (props) => {
  const { treeData, loading, selectedKeysString = "", renderIcon } = props;
  const searchValue = props.searchValue;
  const [selectedInfo, setSelectedInfo] = useState({
    expandedKeys: [],
    selectedKeys: selectedKeysString ? selectedKeysString.split(",") : [],
  });

  const selectedInfoRef = useRef(selectedInfo);

  useEffect(() => {
    selectedInfoRef.current = selectedInfo;
  }, [selectedInfo]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const layerType = urlParams.get("layerType");
    const id = parseInt(urlParams.get("id"));

    console.log("Received id and layerType:", id, layerType);

    // 检查 id 是否有效
    if (!id || isNaN(id)) {
      console.error("Invalid id. Exiting useEffect.");
      return;
    }

    // 如果 layerType 未定义，设定一个默认值
    const actualLayerType = layerType || "defaultLayerType";

    // 根据获取到的参数，设置需要展开的节点和选中的节点
    if (id && treeData) {
      console.log("Inside if statement - id and treeData are truthy");
      if (!treeData || treeData.length === 0) {
        console.log("Tree data is not available or empty. Exiting useEffect.");
        return;
      }

      console.log("Tree data:", treeData);

      // 找到匹配 layerType 和 id 的节点
      const findNode = (data, targetId) => {
        for (const node of data) {
          if (node.id == targetId) {
            console.log("Found matching node:", node.id, node.layerType);
            return node;
          } else if (node.children) {
            const foundInChildren = findNode(node.children, targetId);
            if (foundInChildren) {
              return foundInChildren;
            }
          }
        }
        return null;
      };

      const foundNode = findNode(treeData, id);

      console.log("Found node:", foundNode);

      if (foundNode) {
        console.log("666", 666);
        const key = `${foundNode.id}_${actualLayerType}_${
          foundNode.depth || 0
        }`;
        const expandedKeys = [...selectedInfoRef.current.expandedKeys, key];
        const selectedKeys = [key];
        console.log(
          "Manually calling onSelect with selectedKeys:",
          selectedKeys
        );
        onSelect(selectedKeys, {
          node: { expanded: true, children: foundNode.children },
        });
      } else {
        console.log("No matching node found for id:", id);
      }
    }
    console.log("Exiting useEffect");
  }, [treeData, onSelect]);

  /**
   * 更新菜单选项数据
   * @param {*}
   */
  const updateSelectedInfo = ({ expandedKeys, selectedKeys }) => {
    setSelectedInfo({ expandedKeys, selectedKeys });
  };

  /**
   * 选择菜单
   * @param {*} selectedKeys
   * @param {*} info
   */
  const onSelect = (selectedKeys, info) => {
    console.log("Entering onSelect", selectedKeys, info);
    const {
      node: { expanded, children },
    } = info;
    props.onSelect(info);

    let expandedKeys = selectedInfo.expandedKeys;
    expandedKeys = [...new Set(expandedKeys)];
    selectedKeys =
      selectedKeys.length > 0 ? selectedKeys : selectedInfo.selectedKeys;

    const allChildKeys = [];
    const findAllChildKeys = (child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          allChildKeys.push(item.key);
          if (item.children) {
            findAllChildKeys(item.children);
          }
        });
      }
    };
    findAllChildKeys(children || []);

    if (expanded) {
      // 已经展开，把自身和所有子节点的key删除
      allChildKeys.push(selectedKeys[0]);
      expandedKeys = expandedKeys.filter((key) => !allChildKeys.includes(key));
    } else {
      // 没有展开，把当前节点放进去
      if (selectedKeys[0]) {
        expandedKeys.push(selectedKeys[0]);
      }
    }
    console.log("111", expandedKeys);
    console.log("222", selectedKeys);
    updateSelectedInfo({
      expandedKeys,
      selectedKeys,
    });
    // 在这里更新 layer 变量
    const selectedNode = info.node;
    console.log("Exiting onSelect");
  };

  /**
   * 定义展示
   * @param {*} nodeData
   * @returns
   */
  const titleRender = (nodeData) => {
    const { layerType = LayerTypes.domain?.value, level } = nodeData;
    let tagConfig = "";
    if (renderIcon === ManagementTypes.layer) {
      tagConfig = LayerTypes[layerType];
    } else if (renderIcon === ManagementTypes.business) {
      tagConfig = BusinessTypes[level === 1 ? 1 : 2];
    }
    return (
      <RenderMenuItem
        nodeData={nodeData}
        selectedInfo={selectedInfo}
        tagConfig={tagConfig}
      />
    );
  };

  /**
   * 查询
   */
  const treeDataResult = useMemo(() => {
    if (!searchValue) {
      return treeData;
    }
    let id = "";
    if (renderIcon === ManagementTypes.layer) {
      id = "id";
    } else if (renderIcon === ManagementTypes.business) {
      id = "businessId";
    }
    return searchTreeData({ searchValue, treeData, searchKeys: ["name", id] });
  }, [searchValue, treeData]);

  if (loading) {
    return <Spin />;
  }

  return (
    <Tree
      className="tree-graph"
      showLine
      showLeafIcon={false}
      showIcon={false}
      autoExpandParent={true}
      blockNode={true}
      expandedKeys={selectedInfo.expandedKeys}
      selectedKeys={selectedInfo.selectedKeys}
      onSelect={onSelect}
      treeData={treeDataResult}
      titleRender={titleRender}
    />
  );
};

export default TreeGraph;
