import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import styles from './site-header.module.scss'

const SiteHeader = ({heading, pageName}) => {
  let data = useStaticQuery(graphql`
    query {
      cockpitHeader {
        background_image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }

      }
    }
  `)

  const backgroundFluidImageStack = [
    data.cockpitHeader.background_image.value.childImageSharp.fluid,
    `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`,
  ].reverse()

  return (
    <BackgroundImage
      fadeIn={false}
      fluid={backgroundFluidImageStack}
      className={styles.pageHeader}
      loading="auto"
    >
      <h2 className={styles.pageHeading}>{pageName}</h2>
    </BackgroundImage>
  )
}

export default SiteHeader