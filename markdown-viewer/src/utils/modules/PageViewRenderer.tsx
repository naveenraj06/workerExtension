import { ChartContainer, Lists, ListsItem, type ChartConfig } from "@workerextension/ui";
import { useCallback } from "react";
import { Bar, BarChart } from "recharts";

export const PageViewRenderer = ({layout}:any) => {
  const listView = useCallback(
    (data: any) => {
      return (
        <Lists>
          {data?.map((list: any, index: number) => {
            const listKey = `item-index-${index}`;
            return (
              <ListsItem key={listKey}>
                {list.id ?? `item-index-${index}`}
              </ListsItem>
            );
          })}
        </Lists>
      );
    },
    [layout],
  );

  const sectionRenderer = (section: any) => {
          switch (section?.type) {
        case "list": {
          return listView(section.data ?? []);
        }
        case "chart": {
          const chartConfig = {
            desktop: {
              label: "Desktop",
              color: "#2563eb",
            },
            mobile: {
              label: "Mobile",
              color: "#60a5fa",
            },
          } satisfies ChartConfig;
          
          return section.data.length ? (
            <div className="w-48">
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={section.data}>
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div>No data found</div>
          );
        }
        default: {
          return <div>Invalid section type</div>;
        }
      }
  };

  

  return layout.sections?.map((section:any) => {
    return sectionRenderer(section)
  })
};
