---
title: "Review Social Network Analysis"
description: "Lorem ipsum dolor sit amet - 2"
---

In this analysis, I aim to examine the relationships between users based on their review activities on Google Play Store for the FamPay application. Understanding the interaction between users can provide significant insights into user behavior, and help to identify potential influencers or active reviewers in the user community.

## Network Analysis Methodology

Network analysis is a powerful technique that allows us to understand the structure and properties of complex systems through the study of relations or interactions. In essence, it involves building a network (or graph) of entities (nodes) connected by some relationship (edges). In our case, users who post reviews on the same date with the same score are considered to have a relationship. Degree centrality, which is the number of connections a node has in the network, is used to identify the most influential or central nodes.

One way to understand network analysis is by thinking about social networks. Let's say you want to find the most influential person in a social group. You might look for the person who has the most connections with others. This person would have a high degree centrality, meaning they are connected to many people.

## Preprocessing and Feature Extraction

Initially, I loaded the review data from a CSV file and performed some preprocessing steps. The code used for this purpose is as follows:

```python
df = pd.read_csv('../../Warehouse/Reviews/app_reviews_merged.csv')
df_sample = df.sample(frac=0.1, random_state=1)  # Adjust the fraction as necessary
df_sample['at'] = pd.to_datetime(df_sample['at']).dt.date
```

The date column was converted to a date-only format to remove the time component, which is not necessary for this analysis. To manage the size of the data, I randomly sampled a fraction of the original data.

## Building the Network Graph

I then grouped the data by date and score and used the combinations of user names within each group to create edges in the network graph. This was done using the following code:

```python
groups = df_sample.groupby(['at', 'score'])
G = nx.Graph()
for name, group in groups:
    for user1, user2 in combinations(group['userName'], 2):
        G.add_edge(user1, user2)
```

## Identifying Central Nodes

To identify the most influential users (or nodes), I calculated the degree centrality for each node and listed the top 10 nodes with the highest centrality. The code used for this is as follows:

```python
centrality = nx.degree_centrality(G)
for node in sorted(centrality, key=centrality.get, reverse=True)[:10]:
    print(f'{node}: {centrality[node]:.4f}')
```

## Visualization

Finally, I visualized the network graph using Plotly, with nodes colored by their degree of centrality and sized according to the number of their connections. I also added hover text to each node to show the user name and the number of connections. The network graph was then displayed using `fig.show()`.

<iframe
src = "/App-Analytics/app_reviews_network_graph.html"
>
</iframe>

The visualization provides an intuitive understanding of the network structure. Nodes with higher degrees of centrality are generally more influential within the network as they have more connections. In the context of app reviews, these might be users who are more active or influential, and could potentially be targeted for app promotions or for gathering user feedback.

This kind of analysis allows us to understand the interconnections between users and can provide valuable insights for decision-making in various areas, such as marketing strategies, community management, and user engagement. In the next steps, more advanced network analysis techniques could be applied, such as community detection or identifying network motifs, to reveal more complex structures and patterns in the data.
