import React, { useEffect, useRef } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import * as d3 from 'd3';

interface HeatMapProps {
  data: {
    data: Array<{
      x: string;
      y: string;
      v: number;
    }>;
  };
  width?: number;
  height?: number;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, width = 800, height = 300 }) => {
  const ref = useRef<SVGSVGElement>(null);
  const textColor = useColorModeValue('#1A202C', '#E2E8F0');
  const gridColor = useColorModeValue('#E2E8F0', '#2D3748');

  useEffect(() => {
    if (!ref.current || !data.data.length) return;

    // Clear previous chart
    d3.select(ref.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 25, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract unique x and y values
    const xLabels = Array.from(new Set(data.data.map(d => d.x)));
    const yLabels = Array.from(new Set(data.data.map(d => d.y)));

    // Create scales
    const xScale = d3.scaleBand()
      .domain(xLabels)
      .range([0, innerWidth])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(yLabels)
      .range([innerHeight, 0])
      .padding(0.05);

    // Color scale
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(data.data, d => d.v) || 100]);

    // Create heatmap cells
    svg.selectAll('rect')
      .data(data.data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.x) || 0)
      .attr('y', d => yScale(d.y) || 0)
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', d => colorScale(d.v))
      .style('stroke', gridColor)
      .style('stroke-opacity', 0.3)
      .on('mouseover', function(event, d) {
        d3.select(this).style('stroke', '#2563EB').style('stroke-width', 2);
        
        // Show tooltip
        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.x}, ${d.y}</strong><br/>Value: ${d.v}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('stroke', gridColor).style('stroke-width', 1);
        tooltip.style('opacity', 0);
      });

    // Add tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'heatmap-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('opacity', 0);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'middle')
      .style('fill', textColor)
      .style('font-size', '10px');

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('fill', textColor)
      .style('font-size', '10px');

    // Cleanup function
    return () => {
      d3.select('body').selectAll('.heatmap-tooltip').remove();
    };
  }, [data, width, height, textColor, gridColor]);

  return <svg ref={ref} />;
};

export default HeatMap;
